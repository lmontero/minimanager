/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('member')
    .config(configFunction);
  
  configFunction.$inject = [
    '$routeProvider'
  ];
  
  function configFunction($routeProvider) {
    $routeProvider
      .when('/members', {
        templateUrl: 'members/member.template.html',
        controller: 'MemberController',
        controllerAs: 'vm',
        resolve: {
          members: function (memberRestService) {
            return memberRestService.getList()
              .then(function (result) {
                return result;
              });
          }
        }
      });
  }
})();