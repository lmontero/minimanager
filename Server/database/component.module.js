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
  if (component.RoomId > 0) {
    if (!roomModule.find({_id: component.RoomId}).length) {
      throw new Error('Not exist a room with this key.');
    }
  }
  else {
    component.RoomId = null;
  }
  
  component._id = ++lastComponentId;
  components.push(component);
  return component;
}

function find(parameters) {
  if (!parameters) {
    return components;
  }
  return components.filter(function (component) {
    return (parameters._id !== undefined ? parameters._id === component._id : true) &&
      (parameters.Name !== undefined ? parameters.Name === component.Name : true) &&
      (parameters.RoomId !== undefined ? parameters.RoomId === component.RoomId : true);
  });
}

module.exports = {
  //getAllComponents: getAll,
  find: find,
  insertOne: add
};

//las funciones que se exponen cambiar a nombres standard de mongoose