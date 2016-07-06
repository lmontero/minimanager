/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var teams = [];
var lastTeamId = 0;

/*function getAll() {
  var jsonResult = {
    data: []
  };
  teams.forEach(function (team) {
    var copyTeam = {
      id: '' + team.TeamId,
      type: 'Team',
      attributes: {
        TeamName: team.TeamName,
        TeamLevel: team.TeamLevel
      },
      relationships: {}
    };
    jsonResult.data.push(copyTeam);
  });
  
  return jsonResult;
}*/

function add(team) {
  team._id = ++lastTeamId;
  teams.push(team);
  return team;
}

function find(parameters) {
  if (!parameters) {
    return teams;
  }
  return teams.filter(function (team) {
    return (parameters._id !== undefined ? parameters._id === team._id : true) &&
      (parameters.TeamName !== undefined ? parameters.TeamName === team.TeamName : true) &&
      (parameters.TeamLevel !== undefined ? parameters.TeamLevel === team.TeamLevel : true);
  });
}

module.exports = {
  //getAllTeams: getAll,
  insertOne: add,
  find: find
};