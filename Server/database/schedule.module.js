/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');
var teamModule = require('./team.module');

var schedules= [];
var lastScheduleId = 0;

/*function getAll() {
  var jsonResult = {
    data: []
  };
  schedules.forEach(function (schedule) {
    var copySchedule = {
      id: '' + schedule.ScheduleId,
      type: 'Schedule',
      attributes: {
        StartingDateTime: schedule.StartingDateTime,
        EndingDateTime: schedule.EndingDateTime,
        RoomId: schedule.RoomId,
        TeamId: schedule.TeamId
      },
      relationships: {}
    };
    jsonResult.data.push(copySchedule);
  });

  return jsonResult;
}*/

function add(schedule) {
  return new Promise(function (resolve, reject) {
    if (!schedules) {
      return reject({message: 'Error, something was happened with schedules collection.'});
    }

    if (schedule.RoomId > 0) {
      roomModule.find({_id: schedule.RoomId})
        .then(function (result) {
          if (!result.length) {
            return reject({message: 'Error, not exist a room with this key.'});
          }
        })
        .catch(function (error) {
          return reject(error);
        });
    }
    else {
      schedule.RoomId = null;
    }

    if (schedule.TeamId > 0) {
      teamModule.find({_id: schedule.TeamId})
        .then(function (result) {
          if (!result.length) {
            return reject({message: 'Error, not exist a team with this key.'});
          }
        })
        .catch(function (error) {
          return reject(error);
        });
    }
    else {
      schedule.TeamId = null;
    }

    schedule._id = ++lastScheduleId;
    schedules.push(schedule);
    return resolve(schedule);
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
      return (parameters._id !== undefined ? parameters._id === schedule._id : true) &&
        (parameters.RoomId !== undefined ? parameters.RoomId === schedule.RoomId : true) &&
        (parameters.TeamId !== undefined ? parameters.TeamId === schedule.TeamId : true) &&
        (parameters.StartingDateTime !== undefined ? parameters.StartingDateTime === schedule.StartingDateTime : true) &&
        (parameters.EndingDateTime !== undefined ? parameters.EndingDateTime === schedule.EndingDateTime : true);
    }

    var resultCollection = schedules.filter(filterFunction);

    return resolve(resultCollection);
  });
}

module.exports = {
  find: find,
  insertOne: add
};