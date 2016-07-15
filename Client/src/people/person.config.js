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
  
    //$resourceProvider.defaults.stripTrailingSlashes = false;
  
    /*$resourceProvider.defaults.actions.getAll = {
      method: 'GET',
      isArray: true,
      headers: { 'Content-Type': 'application/json' }
    };*/
    

    $routeProvider
      .when('/people', {
        templateUrl: 'people/person.template.html',
        controller: 'PersonController',
        controllerAs: 'vm',
        resolve: {
          people: function (personRestService) {
            return personRestService.getList()
              .then(function (result) {
                console.log('success');
                console.log(result);
                return result;
              })
              /*.catch(function (error) {
                console.log(error);
                return error;
              })*/;
          }
        }
      });
  }
})();