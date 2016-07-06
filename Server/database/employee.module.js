/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var personModule = require('./person.module');

var employees= [];
var lastEmployeeId = 0;

/*function getAll() {
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
}*/

function add(employee) {
  if (employee.PersonId > 0) {
    if (!personModule.find({_id: employee.PersonId}).length) {
      throw new Error('Not exist a person with this key.');
    }
  }
  else {
    employee.PersonId = null;
  }

  employee._id = ++lastEmployeeId;
  employees.push(employee);
  return employee;
}

function find(parameters) {
  if (!parameters) {
    return employees;
  }
  return employees.filter(function (employee) {
    return (parameters._id !== undefined ? parameters._id === employee._id : true) &&
      (parameters.Code !== undefined ? parameters.Code === employee.Code : true) &&
      (parameters.PersonId !== undefined ? parameters.PersonId === employee.PersonId : true) &&
      (parameters.StartingDate !== undefined ? parameters.StartingDate === employee.StartingDate : true) &&
      (parameters.EndingDate !== undefined ? parameters.EndingDate === employee.EndingDate : true);
  });
}

module.exports = {
  //getAllEmployees: getAll,
  insertOne: add,
  find: find
};