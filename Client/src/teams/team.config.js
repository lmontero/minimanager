/**
 * Created by Luis Montero on 7/15/2016.
 */
(function () {
  'use strict';
  angular
    .module('team')
    .config(teamConfig);

  teamConfig.$inject = [
    '$routeProvider'
  ];

  function teamConfig($routeProvider) {
    $routeProvider
      .when('/teams', {
        templateUrl: 'teams/team.template.html',
        controller: 'TeamController',
        controllerAs: 'vm',
        resolve: {
          teams: function (teamRestService) {
            return teamRestService.getList()
              .then(function (result) {
                return result;
              })
              .catch (function (error) {
                console.log(error);
              });
          }
        }
      });
  }
})();