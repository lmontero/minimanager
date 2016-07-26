/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var teamModule = require('../../database/team.module');
  
  describe('Team Module', function () {
    describe('insertOne()', function () {
      it('Should return the same team with an id when a new team is sent.', function () {
        var teamsCollection = [];
        var lastTeamId = 0;
        var teams = teamModule(teamsCollection, lastTeamId);
        var team = {
          TeamName: "Criminal",
          TeamLevel: 3
        };
        var expectedId = 1;

        return teams.insertOne(team)
          .then(function (result) {
            assert.equal(expectedId, result._id);
          });
      });
  
      it('Should return an object with error message when team collection is undefined.', function () {
        var teamsCollection = undefined;
        var lastTeamId = 0;
        var teams = teamModule(teamsCollection, lastTeamId);
        var team = {
          TeamName: "Criminal",
          TeamLevel: 3
        };
        var expectedMessage = 'Error, something was happened with teams collection.';
        return teams.insertOne(team)
          .catch(function (error) {
            assert.equal(expectedMessage, error.message);
          });
      });
    });

    describe('find()', function () {
      it('Should return all teams collection when is no sent an object with parameters.', function () {
        var teamsCollection = 
          [{
            "_id": "1",
            "TeamName": "Criminal",
            "TeamLevel": 3
          },
          {
            "_id": "2",
            "TeamName": "Fanalis",
            "TeamLevel": 2
          }];
        var expectedCollection =
          [{
            "_id": "1",
            "TeamName": "Criminal",
            "TeamLevel": 3
          },
            {
              "_id": "2",
              "TeamName": "Fanalis",
              "TeamLevel": 2
            }];
        var teams = teamModule(teamsCollection, 0);
        return teams.find()
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });
  
      it('Should return all teams collection when is sent an object with undefined parameters.', function () {
        var teamsCollection =
          [{
            "_id": "1",
            "TeamName": "Criminal",
            "TeamLevel": 3
          },
            {
              "_id": "2",
              "TeamName": "Fanalis",
              "TeamLevel": 2
            }];
        var expectedCollection =
          [{
            "_id": "1",
            "TeamName": "Criminal",
            "TeamLevel": 3
          },
            {
              "_id": "2",
              "TeamName": "Fanalis",
              "TeamLevel": 2
            }];
        var parameters = {};
        var teams = teamModule(teamsCollection, 0);
        return teams.find(parameters)
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });
  
      it('Should return an expected teams collection when is sent parameters.', function () {
        var teamsCollection =
          [{
            "_id": "1",
            "TeamName": "Criminal",
            "TeamLevel": 3
          },
            {
              "_id": "2",
              "TeamName": "Fanalis",
              "TeamLevel": 2
            }];
        var expectedCollection =
          [{
            "_id": "2",
            "TeamName": "Fanalis",
            "TeamLevel": 2
          }];
        var parameters = {
          _id: 2,
          TeamName: "Fanalis",
          TeamLevel: 2
        };
        var teams = teamModule(teamsCollection, 0);
        return teams.find(parameters)
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });

      it('Should return an object with error message when is sent a wrong team collection.', function () {
        var teamsCollection = undefined;
        var expectedError = {
          message: 'Error, something was happened with teams collection.'
        };
        var teams = teamModule(teamsCollection, 0);
        return teams.find()
          .catch(function (error) {
            assert.deepEqual(expectedError, error);
          });
      });
    });
  });
}

module.exports = execute;