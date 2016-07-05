/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');
var teamModule = require('./team.module');

var schedules= [];
var lastScheduleId = 0;

function getAll() {
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
}

function add(schedule) {
  if (schedule.RoomId > 0) {
    if (!roomModule.findRoom(schedule.RoomId)) {
      throw new Error('Not exist a room with this key.');
    }
  }
  else {
    schedule.RoomId = null;
  }

  if (schedule.TeamId > 0) {
    if (!teamModule.findTeam(schedule.TeamId)) {
      throw new Error('Not exist a team with this key.');
    }
  }
  else {
    schedule.TeamId = null;
  }
  schedule.ScheduleId = ++lastScheduleId;
  schedules.push(schedule);
  return schedule;
}

module.exports = {
  getAllEmployees: getAll,
  addEmployee: add
};