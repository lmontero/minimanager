/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('person')
    .config(personConfig);

  personConfig.$inject = [
    '$routeProvider'
  ];

  function personConfig($routeProvider) {
    $routeProvider
      .when('/people', {
        templateUrl: 'people/person.template.html',
        controller: 'PersonController',
        controllerAs: 'vm',
        resolve: {
          people: function (personRestService) {
            return personRestService.getList()
              .then(function (result) {
                return result;
              });
          }
        }
      });
  }
})();