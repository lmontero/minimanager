/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('member')
    .factory('memberRestService', memberRestService);
  
  memberRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];
  
  function memberRestService($resource, BASE_URL) {
    var url = BASE_URL + '/members';
  
    function getAllMembers() {
      var membersResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });
    
      return membersResource.get().$promise;
    }
  
    function postMember(member) {
      var membersResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });
    
      return membersResource.post(member).$promise;
    }
  
    return {
      getList: getAllMembers,
      post: postMember
    };
  }
})();