/**
 * Created by Luis Montero on 7/15/2016.
 */
(function () {
  'use strict';
  angular
    .module('team')
    .factory('teamRestService', teamRestService);

  teamRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];

  function teamRestService($resource, BASE_URL) {
    var url = BASE_URL + '/teams';
    
    function getAllTeams() {
      var teamsResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });
      
      return teamsResource.get().$promise;
    }

    function postTeam(team) {
      var teamsResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });
  
      return teamsResource.post(team).$promise;
    }

    return {
      getList: getAllTeams,
      post: postTeam
    };
  }
})();