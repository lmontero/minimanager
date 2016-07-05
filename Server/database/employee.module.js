/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var personModule = require('./person.module');
var teamModule = require('./team.module');

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
        PersonId: employee.PersonId,
        TeamId: employee.TeamId
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
  
  if (employee.TeamId > 0) {
    if (!teamModule.findTeam(employee.TeamId)) {
      throw new Error('Not exist a team with this key.');
    }
  }
  else {
    employee.TeamId = null;
  }
  employee.EmployeeId = ++lastEmployeeId;
  employees.push(employee);
  return employee;
}

module.exports = {
  getAllEmployees: getAll,
  addEmployee: add
};