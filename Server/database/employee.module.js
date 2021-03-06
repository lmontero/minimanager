/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

//var personModule = require('./person.module');
var dateParser = require('../util/parse.date');

//var employees= [];
//var lastEmployeeId = 0;
function execute(employees, lastEmployeeId, personModule) {
  
  
  function insertOne(employee) {
    if (!employees) {
      return Promise.reject({message: 'Error, something was happened with employees collection.'});
    }
    
    return Promise.resolve()
      .then(function () {
        if (employee.PersonId > 0) {
          return personModule.find({_id: employee.PersonId});
        }
      })
      .then(function (result) {
        if (Array.isArray(result) && !result.length) {
          return Promise.reject({message: 'Error, not exist a people with this key.'});
        }
        
        if (result === undefined) {
          employee.PersonId = null;
        }
        
        employee._id = ++lastEmployeeId;
        employee.StartingDate = dateParser.parseFromDateTimeToDate(new Date());
        employee.EndingDate = null;
        employees.push(employee);
        return Promise.resolve(employee);
      })
      .catch(function (error) {
        return Promise.reject(error);
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
        return (parameters._id !== undefined ? parameters._id == employee._id : true) &&
          (parameters.Code !== undefined ? parameters.Code == employee.Code : true) &&
          (parameters.PersonId !== undefined ? parameters.PersonId == employee.PersonId : true) &&
          (parameters.StartingDate !== undefined ? parameters.StartingDate == employee.StartingDate : true) &&
          (parameters.EndingDate !== undefined ? parameters.EndingDate == employee.EndingDate : true);
      }
      
      var resultCollection = employees.filter(filterFunction);
      
      return resolve(resultCollection);
    });
  }
  
  return {
    insertOne: insertOne,
    find: find
  };
}
/*module.exports = {
  insertOne: add,
  find: find
};*/
module.exports = execute;