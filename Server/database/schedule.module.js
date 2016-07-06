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
  if (schedule.RoomId > 0) {
    if (!roomModule.find({_id: schedule.RoomId}).length) {
      throw new Error('Not exist a room with this key.');
    }
  }
  else {
    schedule.RoomId = null;
  }

  if (schedule.TeamId > 0) {
    if (!teamModule.find({_id: schedule.TeamId}).length) {
      throw new Error('Not exist a team with this key.');
    }
  }
  else {
    schedule.TeamId = null;
  }
  
  schedule._id = ++lastScheduleId;
  schedules.push(schedule);
  return schedule;
}

function find(parameters) {
  if (!parameters) {
    return schedules;
  }
  return schedules.filter(function (schedule) {
    return (parameters._id !== undefined ? parameters._id === schedule._id : true) &&
      (parameters.RoomId !== undefined ? parameters.RoomId === schedule.RoomId : true) &&
      (parameters.TeamId !== undefined ? parameters.TeamId === schedule.TeamId : true) &&
      (parameters.StartingDateTime !== undefined ? parameters.StartingDateTime === schedule.StartingDateTime : true) &&
      (parameters.EndingDateTime !== undefined ? parameters.EndingDateTime === schedule.EndingDateTime : true);
  });
}

module.exports = {
  //getAllEmployees: getAll,
  find: find,
  insertOne: add
};