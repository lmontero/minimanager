/**
 * Created by Luis Montero on 7/6/2016.
 */
'use strict';

function Employee(firstName, lastName, ci, code, startingDate, endingDate) {
  this.FirstName = firstName;
  this.LastName = lastName;
  this.CI = ci;
  this.Code = code;
  this.StartingDate = startingDate;
  this.EndingDate = endingDate;
}

module.exports = {
  Employee: Employee
};

//hacer que sus atributos sean publicos