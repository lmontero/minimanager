/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('schedule')
    .controller('ScheduleController', ScheduleController);

  ScheduleController.$inject = [
    'schedules',
    'scheduleRestService',
    '$window'
  ];

  function ScheduleController(schedules, scheduleRestService, $window) {
    var vm = this;
    vm.schedules = schedules.data;

    setFocus('roomId');
    var schedule = {
      RoomId: '',
      TeamId: '',
      StartingDateTime: '',
      EndingDateTime: ''
    };

    vm.schedule = schedule;

    vm.saveSchedule = function () {
      scheduleRestService.post(vm.schedule)
        .then(function (result) {
          schedules.data.push(result.data);
          clearFields();
          setFocus('roomId');
        })
        .catch(function (error) {
          console.log('schedule post failed...');
          console.log(error);
        });
    };

    function clearFields() {
      schedule.RoomId = '';
      schedule.TeamId = '';
      schedule.StartingDateTime = '';
      schedule.EndingDateTime = '';
    }

    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();