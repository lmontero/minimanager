/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('component')
    .factory('componentRestService', componentRestService);
  
  componentRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];
  
  function componentRestService($resource, BASE_URL) {
    var url = BASE_URL + '/components';

    function getAllComponents() {
      var componentsResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });

      return componentsResource.get().$promise;
    }

    function postComponent(component) {
      var componentsResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });

      return componentsResource.post(component).$promise;
    }

    return {
      getList: getAllComponents,
      post: postComponent
    };
  }
})();