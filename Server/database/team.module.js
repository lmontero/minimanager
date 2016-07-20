/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var teams = [];
var lastTeamId = 0;

function add(team) {
  return new Promise(function (resolve, reject) {
    if (!teams) {
      return reject({message: 'Error, something was happened with teams collection.'});
    }

    team._id = ++lastTeamId;
    teams.push(team);
    return resolve(team);
  });
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!teams) {
      return reject({message: 'Error, something was happened with teams collection.'});
    }

    if (!parameters) {
      return resolve(teams);
    }

    function filterFunction(team) {
      return (parameters._id !== undefined ? parameters._id == team._id : true) &&
        (parameters.TeamName !== undefined ? parameters.TeamName == team.TeamName : true) &&
        (parameters.TeamLevel !== undefined ? parameters.TeamLevel == team.TeamLevel : true);
    }
    
    var resultCollection = teams.filter(filterFunction);

    return resolve(resultCollection);
  });
}

module.exports = {
  insertOne: add,
  find: find
};