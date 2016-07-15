/**
 * Created by Luis Montero on 7/15/2016.
 */
(function () {
  'use strict';
  angular
    .module('room')
    .factory('roomRestService', roomRestService);

  roomRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];
  
  function roomRestService($resource, BASE_URL) {
    var url = BASE_URL + '/rooms';
    
    function getAllRooms() {
      var roomsResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });

      return roomsResource.get().$promise;
    }

    function postRoom(room) {
      var roomsResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });

      return roomsResource.post(room).$promise;
    }

    return {
      getList: getAllRooms,
      post: postRoom
    };
  }
})();