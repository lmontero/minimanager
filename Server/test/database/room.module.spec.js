/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var roomModule = require('../../database/room.module');
  
  describe('Room Module', function () {
    describe('insertOne()', function () {
      it('Should return the same room with an id when a new room is sent.', function () {
        var roomsCollection = [];
        var lastRoomId = 0;
        var rooms = roomModule(roomsCollection, lastRoomId);
        var room = {
          RoomName: "Quillacollo",
          Location: "Jalasoft-PB",
          AccessLevel: "1",
          Capacity: "10"
        };
        var expectedId = 1;

        return rooms.insertOne(room)
          .then(function (result) {
            assert.equal(expectedId, result._id);
          });
      });

      it('Should return an object with error message when room collection is undefined.', function () {
        var roomsCollection = undefined;
        var lastRoomId = 0;
        var rooms = roomModule(roomsCollection, lastRoomId);
        var room = {
          RoomName: "Quillacollo",
          Location: "Jalasoft-PB",
          AccessLevel: "1",
          Capacity: "10"
        };
        var expectedMessage = 'Error, something was happened with rooms collection.';
        return rooms.insertOne(room)
          .catch(function (error) {
            assert.equal(expectedMessage, error.message);
          });
      });
    });

    describe('find()', function () {
      it('Should return all rooms collection when is no sent an object with parameters.', function () {
        var roomsCollection =
          [{
            _id: "1",
            RoomName: "Quillacollo",
            Location: "Jalasoft-PB",
            AccessLevel: "1",
            Capacity: "10"
          },
            {
              _id: "2",
              RoomName: "Tawantinsuyu",
              Location: "Jalasoft-PB",
              AccessLevel: "5",
              Capacity: "8"
            }];
        var expectedCollection =
          [{
            _id: "1",
            RoomName: "Quillacollo",
            Location: "Jalasoft-PB",
            AccessLevel: "1",
            Capacity: "10"
          },
            {
              _id: "2",
              RoomName: "Tawantinsuyu",
              Location: "Jalasoft-PB",
              AccessLevel: "5",
              Capacity: "8"
            }];
        var lastRoomId = 2;
        var rooms = roomModule(roomsCollection, lastRoomId);

        return rooms.find()
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });

      it('Should return all rooms collection when is sent an object with undefined parameters.', function () {
        var roomsCollection =
          [{
            _id: "1",
            RoomName: "Quillacollo",
            Location: "Jalasoft-PB",
            AccessLevel: "1",
            Capacity: "10"
          },
            {
              _id: "2",
              RoomName: "Tawantinsuyu",
              Location: "Jalasoft-PB",
              AccessLevel: "5",
              Capacity: "8"
            }];
        var expectedCollection =
          [{
            _id: "1",
            RoomName: "Quillacollo",
            Location: "Jalasoft-PB",
            AccessLevel: "1",
            Capacity: "10"
          },
            {
              _id: "2",
              RoomName: "Tawantinsuyu",
              Location: "Jalasoft-PB",
              AccessLevel: "5",
              Capacity: "8"
            }];
        var parameters = {};
        var rooms = roomModule(roomsCollection, 0);
        return rooms.find(parameters)
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });

      it('Should return an expected rooms collection when is sent parameters.', function () {
        var roomsCollection =
          [{
            _id: "1",
            RoomName: "Quillacollo",
            Location: "Jalasoft-PB",
            AccessLevel: "1",
            Capacity: "10"
          },
            {
              _id: "2",
              RoomName: "Tawantinsuyu",
              Location: "Jalasoft-PB",
              AccessLevel: "5",
              Capacity: "8"
            }];
        var expectedCollection =
          [{
            _id: "2",
            RoomName: "Tawantinsuyu",
            Location: "Jalasoft-PB",
            AccessLevel: "5",
            Capacity: "8"
          }];
        var parameters = {
          _id: "2",
          RoomName: "Tawantinsuyu",
          Location: "Jalasoft-PB",
          AccessLevel: "5",
          Capacity: "8"
        };
        var lastRoomId = 2;
        var rooms = roomModule(roomsCollection, lastRoomId);
        
        return rooms.find(parameters)
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });

      it('Should return an object with error message when is sent a wrong room collection.', function () {
        var roomsCollection = undefined;
        var expectedError = {
          message: 'Error, something was happened with rooms collection.'
        };
        var rooms = roomModule(roomsCollection, 0);
        return rooms.find()
          .catch(function (error) {
            assert.deepEqual(expectedError, error);
          });
      });
    });
  });
}

module.exports = execute;