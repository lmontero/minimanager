/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('schedule')
    .factory('scheduleRestService', scheduleRestService);
  
  scheduleRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];
  
  function scheduleRestService($resource, BASE_URL) {
    var url = BASE_URL + '/schedules';
  
    function getAllSchedules() {
      var schedulesResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });
    
      return schedulesResource.get().$promise;
    }
  
    function postSchedule(schedule) {
      var schedulesResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });
    
      return schedulesResource.post(schedule).$promise;
    }
  
    return {
      getList: getAllSchedules,
      post: postSchedule
    };
  }
})();