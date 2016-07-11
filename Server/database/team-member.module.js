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
  if (!members) {
    return Promise.reject({message: 'Error, something was happened with members collection.'});
  }

  return Promise.resolve()
    .then(function () {
      if (teamMember.EmployeeId > 0) {
        return employeeModule.find({_id: teamMember.EmployeeId});
      }
    })
    .then(function (result) {
      if (Array.isArray(result) && !result.length) {
        return Promise.reject({message: 'Error, not exist an employee with this key.'});
      }

      if (result === undefined) {
        teamMember.EmployeeId = null;
      }

      if (teamMember.TeamId > 0) {
        return teamModule.find({_id: teamMember.TeamId});
      }
    })
    .then(function (result) {
      if (Array.isArray(result) && !result.length) {
        return Promise.reject({message: 'Error, not exist a team with this key.'});
      }

      if (result === undefined) {
        teamMember.TeamId = null;
      }
  
      teamMember._id = ++lastTeamMemberId;
      members.push(teamMember);
      return Promise.resolve(teamMember);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
/*


  return new Promise(function (resolve, reject) {
    if (!members) {
      return reject({message: 'Error, something was happened with members collection.'});
    }

    if (teamMember.EmployeeId > 0) {
      employeeModule.find({_id: teamMember.EmployeeId})
        .then(function (result) {
          if (!result.length) {
            return reject({message: 'Error, not exist an employee with this key.'});
          }
        })
        .catch(function (error) {
          return reject(error);
        });
    }
    else {
      teamMember.EmployeeId = null;
    }

    if (teamMember.TeamId > 0) {
      teamModule.find({_id: teamMember.TeamId})
        .then(function (result) {
          if (! result.length) {
            return reject({message: 'Error, not exist a team with this key.'});
          }
        })
        .catch(function (error) {
          return reject(error);
        });
    }
    else {
      teamMember.TeamId = null;
    }

    teamMember._id = ++lastTeamMemberId;
    members.push(teamMember);
    return resolve(teamMember);
  });*/
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!members) {
      return reject({message: 'Error, something was happened with members collection.'});
    }

    if (!parameters) {
      return resolve(members);
    }

    function filterFunction(member) {
      return (parameters._id !== undefined ? parameters._id === member._id : true) &&
        (parameters.EmployeeId !== undefined ? parameters.EmployeeId === member.EmployeeId : true) &&
        (parameters.TeamId !== undefined ? parameters.TeamId === member.TeamId : true) &&
        (parameters.StartingDate !== undefined ? parameters.StartingDate === member.StartingDate : true) &&
        (parameters.EndingDate !== undefined ? parameters.EndingDate === member.EndingDate : true);
    }

    var resultCollection = members.filter(filterFunction);

    return resolve(resultCollection);
  });
}

module.exports = {
  find: find,
  insertOne: add
}