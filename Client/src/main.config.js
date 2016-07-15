/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('roomManager')
    .config(configFunction);

  configFunction.$inject = [
    '$routeProvider',
    '$resourceProvider'
  ];

  function configFunction($routeProvider, $resourceProvider) {
    //RestangularProvider.setBaseUrl(BASE_URL);
    //console.log($routeProvider);
    //console.log($resourceProvider);
    $resourceProvider.defaults.stripTrailingSlashes = false;

    /*$resourceProvider.defaults.actions.getAll = {
      method: 'GET',
      isArray: true,
      headers: { 'Content-Type': 'application/json' }
    };*/
    
    $routeProvider.when('home', {
      url: ''
    });
  }
})();