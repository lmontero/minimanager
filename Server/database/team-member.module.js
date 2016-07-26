/**
 * Created by Luis Montero on 7/6/2016.
 */
'use strict';

//var employeeModule = require('./employee.module');
//var teamModule = require('./team.module');
var dateParser = require('../util/parse.date');

//var members= [];
//var lastTeamMemberId = 0;
function execute(members, lastTeamMemberId, teamModule, employeeModule) {
  
  
  function insertOne(teamMember) {
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
        teamMember.StartingDate = dateParser.parseFromDateTimeToDate(new Date());
        teamMember.EndingDate = null;
        members.push(teamMember);
        return Promise.resolve(teamMember);
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
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
        return (parameters._id !== undefined ? parameters._id == member._id : true) &&
          (parameters.EmployeeId !== undefined ? parameters.EmployeeId == member.EmployeeId : true) &&
          (parameters.TeamId !== undefined ? parameters.TeamId == member.TeamId : true) &&
          (parameters.StartingDate !== undefined ? parameters.StartingDate == member.StartingDate : true) &&
          (parameters.EndingDate !== undefined ? parameters.EndingDate == member.EndingDate : true);
      }
      
      var resultCollection = members.filter(filterFunction);
      
      return resolve(resultCollection);
    });
  }
  
  return {
    insertOne: insertOne,
    find: find
  };
}
/*module.exports = {
  find: find,
  insertOne: add
}*/
module.exports = execute;