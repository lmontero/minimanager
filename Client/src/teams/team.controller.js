/**
 * Created by Luis Montero on 7/15/2016.
 */
(function () {
  'use strict';
  angular
    .module('team')
    .controller('TeamController', TeamController);

  TeamController.$inject = [
    'teams',
    'teamRestService',
    '$window'
  ];
  
  function TeamController(teams, teamRestService, $window) {
    var vm = this;
    vm.teams = teams.data;

    setFocus('tNameId');
    var team = {
      teamName: '',
      teamLevel: ''
    };

    vm.team = team;

    vm.saveTeam = function () {
      teamRestService.post(vm.team)
        .then(function (result) {
          teams.data.push(result.data);
          clearFields();
          setFocus('tNameId')
        })
        .catch(function (error) {
          console.log('team post failed.');
          console.log(error);
        });
    };
    
    function clearFields() {
      team.teamName = '';
      team.teamLevel = '';
    }
    
    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();