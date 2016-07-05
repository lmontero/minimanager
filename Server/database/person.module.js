/**
* Created by Luis Montero on 6/29/2016.
*/

'use strict';

var persons = [];
var lastPersonId = 0;

function get() {
  var result = {};
  result.data = [];
  persons.forEach(function (person) {
    var api = {};
    api.attributes = {};
    api.id = person.PersonId;
    api.type = 'Person';
    api.attributes.FirstName = person.FirstName;
    api.attributes.LastName = person.LastName;
    api.attributes.CI = person.CI;
    result.data.push(api);
  });
  return result;
}

function add(person) {
  lastPersonId++;
  person.PersonId = lastPersonId; 
  persons.push(person);
  return person;
}

module.exports = {
  getAllPersons : get,
  insertPerson : add
};

//Controlar los errores, que las funciones no devuelvan true o false.
//http://jsonapi.org/ revisar esta pagina para el formato de los objetos json
//websockets reconecciones investigar