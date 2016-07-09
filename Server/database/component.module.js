/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');

var components = [];
var lastComponentId = 0;

/*function getAll() {
  var jsonResult = {
    data: []
  };
  components.forEach(function (component) {
    var copyRoom = {
      id: '' + component.ComponentId,
      type: 'Component',
      attributes: {
        ComponentName: component.ComponentName,
        RoomId: component.RoomId
      },
      relationships: {}
    };
    jsonResult.data.push(copyRoom);
  });

  return jsonResult;
}*/

function add(component) {
  return new Promise(function (resolve, reject) {
    if (!components) {
      return reject({message: 'Error, something was happened with components collection.'});
    }
    if (component.RoomId > 0) {
      roomModule.find({_id: component.RoomId})
        .then(function (result) {
          if (!result.length) {
            return reject({message: 'Error, not exist a room with this key.'});
          }
        })
        .catch(function (error) {
          return reject(error);
        });
    }
    else {
      component.RoomId = null;
    }

    component._id = ++lastComponentId;
    components.push(component);

    return resolve(component);
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

//las funciones que se exponen cambiar a nombres standard de mongoose