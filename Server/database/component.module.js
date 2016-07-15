/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');

var components = [];
var lastComponentId = 0;

function add(component) {
  if (!components) {
    return Promise.reject({message: 'Error, something was happened with components collection.'});
  }

  return Promise.resolve()
    .then(function () {
      if (component.RoomId > 0) {
        return roomModule.find({_id: component.RoomId});
      }
    })
    .then(function (result) {
      if (Array.isArray(result) && !result.length) {
        return Promise.reject({message: 'Error, not exist a room with this key.'});
      }

      if (result === undefined) {
        component.RoomId = null;
      }

      component._id = ++lastComponentId;
      components.push(component);
      return component;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!components) {
      return reject({message: 'Error, something was happened with components collection.'});
    }

    if (!parameters) {
      return resolve(components);
    }

    function filterFunction(component) {
      return (parameters._id !== undefined ? parameters._id === component._id : true) &&
        (parameters.Name !== undefined ? parameters.Name === component.Name : true) &&
        (parameters.RoomId !== undefined ? parameters.RoomId === component.RoomId : true);
    }

    var resultCollection = components.filter(filterFunction);

    return resolve(resultCollection);
  });
}

module.exports = {
  find: find,
  insertOne: add
};