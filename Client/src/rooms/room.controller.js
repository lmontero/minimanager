/**
 * Created by Luis Montero on 7/15/2016.
 */
(function () {
  'use strict';
  angular
    .module('room')
    .controller('RoomController', RoomController);
  
  RoomController.$inject = [
    'rooms',
    'roomRestService',
    '$window'
  ];
  
  function RoomController(rooms, roomRestService, $window) {
    var vm = this;
    vm.rooms = rooms.data;

    setFocus('rNameId');
    var room = {
      RoomName: '',
      Location: '',
      AccessLevel: '',
      Capacity: ''
    };

    vm.room = room;

    vm.saveRoom = function () {
      roomRestService.post(vm.room)
        .then(function (result) {
          rooms.data.push(result.data);
          clearFields();
          setFocus('rNameId')
        })
        .catch(function (error) {
          console.log('room post failed.');
          console.log(error);
        });
    };

    function clearFields() {
      room.RoomName = '';
      room.Location = '';
      room.AccessLevel = '';
      room.Capacity = '';
    }

    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();