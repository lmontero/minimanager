/**
 * Created by Luis Montero on 7/6/2016.
 */
'use strict';

var components = [];
var employees = [];
var people = [];
var rooms = [];
var schedules = [];
var teams = [];
var members = [];
var lastComponentId = 0;
var lastEmployeeId = 0;
var lastPersonId = 0;
var lastRoomId = 0;
var lastScheduleId = 0;
var lastTeamId = 0;
var lastMemberId = 0;

var roomModule = require('./room.module')(rooms, lastRoomId);
var personModule = require('./person.module')(people, lastPersonId);
var teamModule = require('./team.module')(teams, lastTeamId);
var componentModule = require('./component.module')(components, lastComponentId, roomModule);
var employeeModule = require('./employee.module')(employees, lastEmployeeId, personModule);
var memberModule = require('./team-member.module')(members, lastMemberId, teamModule, employeeModule);
var scheduleModule = require('./schedule.module')(schedules, lastScheduleId, roomModule, teamModule);

function loadModules() {
  return {
    components: componentModule,
    employees: employeeModule,
    people: personModule,
    rooms: roomModule,
    schedules: scheduleModule,
    teams: teamModule,
    members: memberModule
  };
}

module.exports = {
  createDatabase: loadModules
};