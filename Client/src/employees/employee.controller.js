/**
 * Created by Luis Montero on 7/18/2016.
 */
(function () {
  'use strict';
  angular
    .module('employee')
    .controller('EmployeeController', EmployeeController);
  
  EmployeeController.$inject = [
    'employees',
    'employeeRestService',
    '$window'
  ];
  
  function EmployeeController(employees, employeeRestService, $window) {
    var vm = this;
    vm.employees = employees.data;
  
    setFocus('codeId');
    var employee = {
      Code: '',
      PersonId: ''
    };
  
    vm.employee = employee;
  
    vm.saveEmployee = function () {
      employeeRestService.post(vm.employee)
        .then(function (result) {
          employees.data.push(result.data);
          clearFields();
          setFocus('codeId');
        })
        .catch(function (error) {
          console.log('employee post failed...');
          console.log(error);
        });
    };
  
    function clearFields() {
      employee.Code = '';
      employee.PersonId = '';
    }
  
    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();