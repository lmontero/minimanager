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
  return new Promise(function (resolve, reject) {
    if (!employees) {
      return reject({message: 'Error, something was happened with employees collection.'});
    }

    if (employee.PersonId > 0) {
      personModule.find({_id: employee.PersonId})
        .then(function (result) {
          if (!result.length) {
            return reject({message: 'Error, not exist a person with this key.'})
          }
        })
        .catch(function (error) {
          return reject(error);
        });
    }
    else {
      employee.PersonId = null;
    }

    employee._id = ++lastEmployeeId;
    employees.push(employee);
    return resolve(employee);
  });
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!employees) {
      return reject({message: 'Error, something was happened with employees collection.'});
    }

    if (!parameters) {
      return resolve(employees);
    }

    function filterFunction(employee) {
      return (parameters._id !== undefined ? parameters._id === employee._id : true) &&
        (parameters.Code !== undefined ? parameters.Code === employee.Code : true) &&
        (parameters.PersonId !== undefined ? parameters.PersonId === employee.PersonId : true) &&
        (parameters.StartingDate !== undefined ? parameters.StartingDate === employee.StartingDate : true) &&
        (parameters.EndingDate !== undefined ? parameters.EndingDate === employee.EndingDate : true);
    }

    var resultCollection = employees.filter(filterFunction);

    return resolve(resultCollection);
  });
}

module.exports = {
  insertOne: add,
  find: find
};