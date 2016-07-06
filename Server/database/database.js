/**
 * Created by Luis Montero on 7/6/2016.
 */
'use strict';

var componentModule = require('./component.module');
var employeeModule = require('./employee.module');
var personModule = require('./person.module');
var roomModule = require('./room.module');
var scheduleModule = require('./schedule.module');
var teamModule = require('./team.module');
var memberModule = require('./team-member.module');

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