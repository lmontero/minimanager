/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var rooms = [];
var lastRoomId = 0;

/*function getAll() {
  var jsonResult = {
    data: []
  };
  rooms.forEach(function (room) {
    var copyRoom = {
      id: '' + room.RoomId,
      type: 'Room',
      attributes: {
        RoomName: room.RoomName,
        AccessLevel: room.AccessLevel,
        Location: room.Location,
        Capacity: room.Capacity
      },
      relationships: {}
    };
    jsonResult.data.push(copyRoom);
  });

  return jsonResult;
}*/

function add(room) {
  room._id = ++lastRoomId;
  rooms.push(room);
  return room;
}

function find(parameters) {
  if (!parameters) {
    return rooms;
  }
  return rooms.filter(function (room) {
    return (parameters._id !== undefined ? parameters._id === room._id : true) &&
      (parameters.RoomName !== undefined ? parameters.RoomName === room.RoomName : true) &&
      (parameters.Location !== undefined ? parameters.Location === room.Location : true) &&
      (parameters.Capacity !== undefined ? parameters.Capacity === room.Capacity : true) &&
      (parameters.AccessLevel !== undefined ? parameters.AccessLevel === room.AccessLevel : true);
  });
}

module.exports = {
  //getAllRooms: getAll,
  insertOne: add,
  find: find
};