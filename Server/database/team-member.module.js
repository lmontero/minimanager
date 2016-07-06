/**
 * Created by Luis Montero on 7/6/2016.
 */
'use strict';

var employeeModule = require('./employee.module');
var teamModule = require('./team.module');

var members= [];
var lastTeamMemberId = 0;

/*function getAll() {
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
}*/

function add(teamMember) {
  if (teamMember.EmployeeId > 0) {
    if (!employeeModule.find({_id: teamMember.EmployeeId}).length) {
      throw new Error('Not exist an employee with this key.');
    }
  }
  else {
    teamMember.EmployeeId = null;
  }

  if (teamMember.TeamId > 0) {
    if (!teamModule.find({_id: teamMember.TeamId}).length) {
      throw new Error('Not exist a team with this key.');
    }
  }
  else {
    teamMember.TeamId = null;
  }
  
  teamMember._id = ++lastTeamMemberId;
  members.push(teamMember);
  return teamMember;
}

function find(parameters) {
  if (!parameters) {
    return members;
  }
  return members.filter(function (member) {
    return (parameters._id !== undefined ? parameters._id === member._id : true) &&
      (parameters.EmployeeId !== undefined ? parameters.EmployeeId === member.EmployeeId : true) &&
      (parameters.TeamId !== undefined ? parameters.TeamId === member.TeamId : true) &&
      (parameters.StartingDate !== undefined ? parameters.StartingDate === member.StartingDate : true) &&
      (parameters.EndingDate !== undefined ? parameters.EndingDate === member.EndingDate : true);
  });
}

module.exports = {
  //getAllTeamMembers: getAll,
  find: find,
  insertOne: add
}