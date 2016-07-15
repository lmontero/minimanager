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
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $routeProvider.when('/home', {
      url: ''
    });
  }
})();