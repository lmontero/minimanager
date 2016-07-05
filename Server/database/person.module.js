/**
* Created by Luis Montero on 6/29/2016.
*/
'use strict';
var persons = [];
var lastPersonId = 0;

function getAll() {
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
}

function add(person) {
  person.PersonId = ++lastPersonId;
  persons.push(person);
  return person;
}

function find(personId) {
  return persons.filter(function (person) {
    return person.PersonId === personId;
  });
}

module.exports = {
  getAllPersons: getAll,
  addPerson: add,
  findPerson: find
};

//Controlar los errores, que las funciones no devuelvan true o false.
//http://jsonapi.org/ revisar esta pagina para el formato de los objetos json
//websockets reconecciones investigar