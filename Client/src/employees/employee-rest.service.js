/**
 * Created by Luis Montero on 7/18/2016.
 */
(function () {
  'use strict';
  angular
    .module('employee')
    .factory('employeeRestService', employeeRestService);

  employeeRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];

  function employeeRestService($resource, BASE_URL) {
    var url = BASE_URL + '/employees';

    function getAllEmployees() {
      var employeeResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });

      return employeeResource.get().$promise;
    }

    function postEmployee(employee) {
      var employeesResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });

      return employeesResource.post(employee).$promise;
    }

    return {
      getList: getAllEmployees,
      post: postEmployee
    }
  }
})();