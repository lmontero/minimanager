/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('schedule')
    .config(configFunction);
  
  configFunction.$inject = [
    '$routeProvider'
  ];
  
  function configFunction($routeProvider) {
    $routeProvider
      .when('/schedules', {
        templateUrl: 'schedules/schedule.template.html',
        controller: 'ScheduleController',
        controllerAs: 'vm',
        resolve: {
          schedules: function (scheduleRestService) {
            return scheduleRestService.getList()
              .then(function (result) {
                return result;
              });
          }
        }
      });
  }
})();