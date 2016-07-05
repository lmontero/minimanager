/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var teams = [];
var lastTeamId = 0;

function getAll() {
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
      }
    };
    jsonResult.data.push(copyTeam);
  });
  
  return jsonResult;
}

function add(team) {
  team.TeamId = ++lastTeamId;
  teams.push(team);
  return team;
}

module.exports = {
  getAllTeams : getAll,
  addTeam: add
};