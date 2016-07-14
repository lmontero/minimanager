/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('person')
    .config(personConfig);

  personConfig.$inject = [
    '$routeProvider',
    '$resourceProvider'
  ];

  function personConfig($routeProvider, $resourceProvider) {
    //$urlRouterProvider.otherwise('/home');
    console.log('people config');
    /*$stateProvider.state('people', {
      url: '/people',
      templateUrl: '/people/people.template.html',
      controller: 'PersonController',
      controllerAs: 'vm'
    });*/

    $routeProvider
      .when('/people', {
        templateUrl: 'people/person.template.html',
        controller: 'PersonController',
        controllerAs: 'vm',
        resolve: {
          people: function (personRestService) {
            return personRestService.getPeople()
              .then(function (result) {
                console.log('success');
                console.log(result);
                return result.data;
              });
          }
        }
      });
  }
})();