/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('member')
    .controller('MemberController', MemberController);
  
  MemberController.$inject = [
    'members',
    'memberRestService',
    '$window'
  ];
  
  function MemberController(members, memberRestService, $window) {
    var vm = this;
    vm.members = members.data;
  
    setFocus('teamId');
    var member = {
      TeamId: '',
      EmployeeId: ''
    };
  
    vm.member = member;
  
    vm.saveMember = function () {
      memberRestService.post(vm.member)
        .then(function (result) {
          members.data.push(result.data);
          clearFields();
          setFocus('teamId');
        })
        .catch(function (error) {
          console.log('member post failed...');
          console.log(error);
        });
    };
  
    function clearFields() {
      member.TeamId = '';
      member.EmployeeId = '';
    }
  
    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();