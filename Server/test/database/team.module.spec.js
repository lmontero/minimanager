/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute() {
  'use strict';
  
  var teamModule = require('../../database/team.module');
  
  describe('Team Module', function () {
    /*beforeEach(function() {
      return db.clear()
        .then(function() {
          return db.save([tobi, loki, jane]);
        });
    });*/
    describe('add()', function () {
      it('Should return the same team with an id when a new team is sent.', function () {
        var team = {
          TeamName: "Criminal",
          TeamLevel: 3
        };

        //return teamModule.insertOne(team).should.eventually.have._id(1);
      });
    });
  });
}

module.exports = execute;