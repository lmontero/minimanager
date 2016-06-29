/**
* Created by Luis Montero on 6/29/2016.
*/

'use strict';
const ERROR_SAME_PRIMARY_KEY_MESSAGE = 'An element have the same primary key.';

var persons = [];

function get() {
  return persons;
}

function add(person) {
  if (persons.filter(function (item) {
      return item.PersonId === person.PersonId
    }).length){
    throw new Error(ERROR_SAME_PRIMARY_KEY_MESSAGE);
  }
  persons.push(person);
  return person;
}

module.exports = {
  getAllPersons : get,
  insertPerson : add
};

//Controlar los errores, que las funciones no devuelvan true o false.
//http://jsonapi.org/ revisar esta pagina para el formato de los objetos json