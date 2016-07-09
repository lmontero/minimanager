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
  return new Promise(function (resolve, reject) {
    if (!people) {
      return reject({message: 'Error, something was happened with people collection.'});
    }
    person._id = ++lastPersonId;
    people.push(person);
    resolve(person);
  });
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!people) {
      return reject({message: 'Error, something was happened with people collection.'});
    }

    if (!parameters) {
      return resolve(people);
    }

    function filterFunction(person) {
      return (parameters._id !== undefined ? parameters._id === person._id : true) &&
        (parameters.FirstName !== undefined ? parameters.FirstName === person.FirstName : true) &&
        (parameters.LastName !== undefined ? parameters.LastName === person.LastName : true) &&
        (parameters.CI !== undefined ? parameters.CI === person.CI : true);
    }

    var resultCollection = people.filter(filterFunction);

    return resolve(resultCollection);
  });
}

module.exports = {
  insertOne: add,
  find: find
};

//Controlar los errores, que las funciones no devuelvan true o false.
//http://jsonapi.org/ revisar esta pagina para el formato de los objetos json
//websockets reconecciones investigar