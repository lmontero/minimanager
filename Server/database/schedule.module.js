/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');
var teamModule = require('./team.module');
var moment = require('moment');

var schedules= [];
var lastScheduleId = 0;

function add(schedule) {
  if (!schedules) {
    return Promise.reject({message: 'Error, something was happened with schedules collection.'});
  }

  return Promise.resolve()
    .then(function () {
      var start = moment(schedule.StartingDateTime, 'MM-DD-YYYY');
      var end = moment(schedule.EndingDateTime, 'MM-DD-YYYY');
      console.log(moment());
      if (end.isBefore(start)) {
        console.log('Start time is more than end time.');
      }
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

module.exports = {
  find: find,
  insertOne: add
};