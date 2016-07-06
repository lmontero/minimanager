/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var personModule = require('./person.module');

var employees= [];
var lastEmployeeId = 0;

function getAll() {
  var jsonResult = {
    data: []
  };
  employees.forEach(function (employee) {
    var copyEmployee = {
      id: '' + employee.EmployeeId,
      type: 'Employee',
      attributes: {
        Code: employee.Code,
        StartingDate: employee.StartingDate,
        EndingDate: employee.EndingDate,
        PersonId: employee.PersonId
      },
      relationships: {}
    };
    jsonResult.data.push(copyEmployee);
  });

  return jsonResult;
}

function add(employee) {
  if (employee.PersonId > 0) {
    if (!personModule.findPerson(employee.PersonId)) {
      throw new Error('Not exist a person with this key.');
    }
  }
  else {
    employee.PersonId = null;
  }

  employee.EmployeeId = ++lastEmployeeId;
  employees.push(employee);
  return employee;
}

function find(employeeId) {
  return employees.filter(function (employee) {
    return employee.EmployeeId === employeeId;
  });
}

module.exports = {
  getAllEmployees: getAll,
  addEmployee: add,
  findEmployee: find
};