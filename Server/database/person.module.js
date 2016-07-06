/**
* Created by Luis Montero on 6/29/2016.
*/
'use strict';
var people = [];
var lastPersonId = 0;

/*function getAll() {
  var jsonResult = {
    data: []
  };
  persons.forEach(function (person) {
    var copyPerson = {
      id: '' + person.PersonId,
      type: 'Person',
      attributes: {
        FirstName: person.FirstName,
        LastName: person.LastName,
        CI: person.CI
      },
      relationships: {}
    };
    jsonResult.data.push(copyPerson);
  });

  return jsonResult;
}*/

function add(person) {
  person._id = ++lastPersonId;
  people.push(person);
  return person;
}

function find(parameters) {
  if (!parameters) {
    return people;
  }
  return people.filter(function (person) {
    return (parameters._id !== undefined ? parameters._id === person._id : true) &&
      (parameters.FirstName !== undefined ? parameters.FirstName === person.FirstName : true) &&
      (parameters.LastName !== undefined ? parameters.LastName === person.LastName : true) &&
      (parameters.CI !== undefined ? parameters.CI === person.CI : true);
  });
}

module.exports = {
  //getAllPersons: getAll,
  insertOne: add,
  find: find
};

//Controlar los errores, que las funciones no devuelvan true o false.
//http://jsonapi.org/ revisar esta pagina para el formato de los objetos json
//websockets reconecciones investigar