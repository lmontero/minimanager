/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('schedule')
    .config(configFunction);
  
  configFunction.$inject = [
    '$routeProvider',
    'momentPickerProvider'
  ];
  
  function configFunction($routeProvider, momentPickerProvider) {
    momentPickerProvider.options({
      // Picker properties
      locale: 'en',
      minView: 'decade',
      maxView: 'hour'
    });

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
          },
          rooms: function (roomRestService) {
            return roomRestService.getList()
              .then(function (result) {
                return result
              });
          },
          teams: function (teamRestService) {
            return teamRestService.getList()
              .then(function (result) {
                return result;
              });
          }
        }
      });
  }
})();