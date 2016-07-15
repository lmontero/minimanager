/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var rooms = [];
var lastRoomId = 0;

function add(room) {
  return new Promise(function (resolve, reject) {
    if (!rooms) {
      return reject({message: 'Error, something was happened with rooms collection.'});
    }
  
    room._id = ++lastRoomId;
    rooms.push(room);
    return resolve(room);
  });
}

function find(parameters) {
  return new Promise(function (resolve, reject) {
    if (!rooms) {
      return reject({message: 'Error, something was happened with rooms collection.'});
    }
  
    if (!parameters) {
      return resolve(rooms);
    }
  
    function filterFunction(room) {
      return (parameters._id !== undefined ? parameters._id === room._id : true) &&
        (parameters.RoomName !== undefined ? parameters.RoomName === room.RoomName : true) &&
        (parameters.Location !== undefined ? parameters.Location === room.Location : true) &&
        (parameters.Capacity !== undefined ? parameters.Capacity === room.Capacity : true) &&
        (parameters.AccessLevel !== undefined ? parameters.AccessLevel === room.AccessLevel : true);
    }
    
    var resultCollection = rooms.filter(filterFunction);
    
    return resolve(resultCollection);
  });
}

module.exports = {
  insertOne: add,
  find: find
};