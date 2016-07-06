/**
 * Created by Luis Montero on 7/6/2016.
 */
'use strict';

var employeeModule = require('./employee.module');
var teamModule = require('./team.module');

var teamMembers= [];
var lastTeamMemberId = 0;

function getAll() {
  var jsonResult = {
    data: []
  };
  teamMembers.forEach(function (teamMember) {
    var copyTeamMember = {
      id: '' + teamMember.TeamMemberId,
      type: 'TeamMember',
      attributes: {
        StartingDate: teamMember.StartingDate,
        EndingDate: teamMember.EndingDate,
        EmployeeId: teamMember.EmployeeId,
        TeamId: teamMember.TeamId
      },
      relationships: {}
    };
    jsonResult.data.push(copyTeamMember);
  });

  return jsonResult;
}

function add(teamMember) {
  if (teamMember.EmployeeId > 0) {
    if (!employeeModule.findEmployee(teamMember.EmployeeId)) {
      throw new Error('Not exist an employee with this key.');
    }
  }
  else {
    teamMember.EmployeeId = null;
  }

  if (teamMember.TeamId > 0) {
    if (!teamModule.findTeam(teamMember.TeamId)) {
      throw new Error('Not exist a team with this key.');
    }
  }
  else {
    teamMember.TeamId = null;
  }
  teamMember.TeamMemberId = ++lastTeamMemberId;
  teamMembers.push(teamMember);
  return teamMember;
}

module.exports = {
  getAllTeamMembers: getAll,
  addTeamMember: add
}