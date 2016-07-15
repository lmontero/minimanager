/**
 * Created by Luis Montero on 7/15/2016.
 */
(function () {
  'use strict';
  angular
    .module('room')
    .config(roomConfig);
  
  roomConfig.$inject = [
    '$routeProvider'
  ];
  
  function roomConfig($routeProvider) {
    $routeProvider
      .when('/rooms', {
        templateUrl: 'rooms/room.template.html',
        controller: 'RoomController',
        controllerAs: 'vm',
        resolve: {
          rooms: function (roomRestService) {
            return roomRestService.getList()
              .then(function (result) {
                return result;
              })
              .catch (function (error) {
                console.log(error);
              });
          }
        }
      });
  }
})();