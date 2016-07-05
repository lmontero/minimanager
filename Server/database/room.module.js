/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var rooms = [];
var lastRoomId = 0;

function getAll() {
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
}

function add(room) {
  room.RoomId = ++lastRoomId;
  rooms.push(room);
  return room;
}

function find(roomId) {
  return rooms.filter(function (room) {
    return room.RoomId === roomId;
  });
}

module.exports = {
  getAllRooms: getAll,
  addRoom: add,
  findRoom: find
};