/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('component')
    .config(configFunction);
  
  configFunction.$inject = [
    '$routeProvider'
  ];
  
  function configFunction($routeProvider) {
    $routeProvider
      .when('/components', {
        templateUrl: 'components/component.template.html',
        controller: 'ComponentController',
        controllerAs: 'vm',
        resolve: {
          components: function (componentRestService) {
            return componentRestService.getList()
              .then(function (result) {
                return result;
              });
          }
        }
      });
  }
})();