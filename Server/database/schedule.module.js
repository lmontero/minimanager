/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');
var teamModule = require('./team.module');
var moment = require('moment');

var schedules= [];
var lastScheduleId = 0;

const DATE_TIME_FORMAT = 'MM-DD-YYYY h:mm:ss a';
const GRANULARITY_FORMAT = 'minute';
const FIRST_OPEN_LAST_CLOSED_FORMAT = '(]';
const FIRST_CLOSED_LAST_OPEN_FORMAT = '[)';

function add(schedule) {
  if (!schedules) {
    return Promise.reject({message: 'Error, something was happened with schedules collection.'});
  }

  return Promise.resolve()
    .then(function () {
      if (compareIfADateTimeIsLessOrEqualThanAnotherDateTime(schedule.StartingDateTime, '' + moment().format(DATE_TIME_FORMAT))) {
        return Promise.reject({ message: 'Starting date time is less or equal than the current date time.' });
      }
      if (compareIfADateTimeIsLessOrEqualThanAnotherDateTime(schedule.EndingDateTime, '' + moment().format(DATE_TIME_FORMAT))) {
        return Promise.reject({ message: 'Ending date time is less or equal than the current date time.' });
      }
      if (compareIfADateTimeIsLessOrEqualThanAnotherDateTime(schedule.EndingDateTime, schedule.StartingDateTime)) {
        return Promise.reject({ message: 'Ending date time is less or equal than Starting date time.' });
      }
    })
    .then(function () {
      var resultSchedule = schedules.filter(function (innerSchedule) {
        var currentDateTime = moment().format(DATE_TIME_FORMAT);
        return innerSchedule.RoomId == schedule.RoomId &&
        !compareIfADateTimeIsLessOrEqualThanAnotherDateTime(innerSchedule.EndingDateTime, '' + currentDateTime) &&
          compareIfAScheduleIsInDueWithAnotherSchedule(schedule.StartingDateTime, schedule.EndingDateTime, innerSchedule.StartingDateTime, innerSchedule.EndingDateTime);
      });

      return resultSchedule.length ? Promise.reject({ message: 'The sent schedule is in due to another schedule.' }) : undefined;
    })
    .then(function () {
      if (schedule.RoomId > 0) {
        return roomModule.find({_id: schedule.RoomId})
      }
    })
    .then(function (result) {
      if (Array.isArray(result) && !result.length) {
        return Promise.reject({message: 'Error, not exist a room with this key.'});
      }

      if (result === undefined) {
        return Promise.reject({message: 'Error, the room id is mandatory.'});
      }

      if (schedule.TeamId > 0) {
        return teamModule.find({_id: schedule.TeamId});
      }
    })
    .then(function (result) {
      if (Array.isArray(result) && !result.length) {
        return Promise.reject({message: 'Error, not exist a team with this key.'});
      }
      
      if (result === undefined) {
        return Promise.reject({message: 'Error, the team id is mandatory.'});
      }
  
      schedule._id = ++lastScheduleId;
      schedules.push(schedule);
      
      return Promise.resolve(schedule);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!schedules) {
      return reject({message: 'Error, something was happened with schedules collection.'});
    }

    if (!parameters) {
      return resolve(schedules);
    }

    function filterFunction(schedule) {
      return (parameters._id !== undefined ? parameters._id == schedule._id : true) &&
        (parameters.RoomId !== undefined ? parameters.RoomId == schedule.RoomId : true) &&
        (parameters.TeamId !== undefined ? parameters.TeamId == schedule.TeamId : true) &&
        (parameters.StartingDateTime !== undefined ? parameters.StartingDateTime == schedule.StartingDateTime : true) &&
        (parameters.EndingDateTime !== undefined ? parameters.EndingDateTime == schedule.EndingDateTime : true);
    }

    var resultCollection = schedules.filter(filterFunction);

    return resolve(resultCollection);
  });
}

/**
 * Verifies if the first date time is less or equal than the second date time.
 * @param {string} firstDateTime
 * @param {string} secondDateTime
 * @return {boolean}
 */
function compareIfADateTimeIsLessOrEqualThanAnotherDateTime(firstDateTime, secondDateTime) {
  return moment(firstDateTime, DATE_TIME_FORMAT)
    .isSameOrBefore(moment(secondDateTime, DATE_TIME_FORMAT).format(), GRANULARITY_FORMAT);
}

/**
 * Verifies if a schedule is in due with another schedule.
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @param {string} anotherStartDateTime
 * @param {string} anotherEndDateTime
 * @return {boolean}
 */
function compareIfAScheduleIsInDueWithAnotherSchedule(startDateTime, endDateTime, anotherStartDateTime, anotherEndDateTime) {
  var startOneMoment = moment(startDateTime, DATE_TIME_FORMAT);
  var endOneMoment = moment(endDateTime, DATE_TIME_FORMAT);
  var startTwoMoment = moment(anotherStartDateTime, DATE_TIME_FORMAT);
  var endTwoMoment = moment(anotherEndDateTime, DATE_TIME_FORMAT);
  return startOneMoment.isBetween(startTwoMoment.format(), endTwoMoment.format(), GRANULARITY_FORMAT, FIRST_CLOSED_LAST_OPEN_FORMAT) ||
    endOneMoment.isBetween(startTwoMoment.format(), endTwoMoment.format(), GRANULARITY_FORMAT, FIRST_OPEN_LAST_CLOSED_FORMAT) ||
    (startOneMoment.isBefore(startTwoMoment.format(), GRANULARITY_FORMAT) && endOneMoment.isAfter(endTwoMoment.format(), GRANULARITY_FORMAT));
}

module.exports = {
  find: find,
  insertOne: add
};