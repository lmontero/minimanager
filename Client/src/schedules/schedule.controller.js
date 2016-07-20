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
    'rooms',
    'teams',
    'scheduleRestService',
    '$window'
  ];

  const FirstPosition = 0;

  function ScheduleController(schedules, rooms, teams, scheduleRestService, $window) {
    var vm = this;
    vm.schedules = schedules.data;
    vm.teams = teams.data;
    vm.rooms = rooms.data;
    vm.selectedTeam = {};
    vm.selectedRoom = {};
    vm.minDateTime = new Date();

    setFocus('roomId');
    var schedule = {
      RoomId: '',
      TeamId: '',
      StartingDateTime: '',
      EndingDateTime: ''
    };
    clearFields();

    vm.schedule = schedule;

    vm.saveSchedule = function () {
      schedule.RoomId = '' + vm.selectedRoom._id;
      schedule.TeamId = '' + vm.selectedTeam._id;

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
      if (vm.teams.length) {
        vm.selectedTeam = vm.teams[FirstPosition];
      }
      if (vm.rooms.length) {
        vm.selectedRoom = vm.rooms[FirstPosition];
      }
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