/**
 * Created by Luis Montero on 7/18/2016.
 */
(function () {
  'use strict';
  angular
    .module('employee')
    .config(employeeConfig);
  
  employeeConfig.$inject = [
    '$routeProvider'
  ];
  
  function employeeConfig($routeProvider) {
    $routeProvider
      .when('/employees', {
        templateUrl: 'employees/employee.template.html',
        controller: 'EmployeeController',
        controllerAs: 'vm',
        resolve: {
          employees: function (employeeRestService) {
            return employeeRestService.getList()
              .then(function (result) {
                return result;
              });
          }
        }
      });
  }
})();