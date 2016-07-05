/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

var roomModule = require('./room.module');

var components = [];
var lastComponentId = 0;

function getAll() {
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
}

function add(component) {
  if (component.RoomId > 0) {
    if (!roomModule.findRoom(component.RoomId)) {
      throw new Error('Not exist a room with this key.');
    }
  }
  else {
    component.RoomId = null;
  }
  component.ComponentId = ++lastComponentId;
  components.push(component);
  return component;
}

module.exports = {
  getAllComponents: getAll,
  addComponent: add
};