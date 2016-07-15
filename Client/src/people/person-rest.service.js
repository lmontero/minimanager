/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('person')
    .factory('personRestService', personRestService);

  personRestService.$inject = [
    '$resource',
    'BASE_URL'
  ];

  function personRestService($resource, BASE_URL) {
    var url = BASE_URL + '/people';
    
    function getAllPeople() {
      var peopleResource = $resource(url, {}, {
        get: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });
      
      return peopleResource.get().$promise;
    }
    
    function postPerson(person) {
      var peopleResource = $resource(url, {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });
  
      return peopleResource.post(person).$promise;
    }
    
    return {
      getList: getAllPeople,
      post: postPerson
    }
  }
})();