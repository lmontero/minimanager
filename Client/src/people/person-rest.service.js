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
    console.log('people rest');
    
    function getAllPeople() {
      
      var people = $resource(BASE_URL + '/people', {}, {
        get: {
          method: 'GET',
          isArray: false,
          headers: { 'Content-Type': 'application/json' },
          data: null
        }
      });
      
      return people.get().$promise;
    }
    
    function postPerson(person) {
      var people = $resource(BASE_URL + '/people', {}, {
        post: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });
  
      return people.post(person).$promise;
    }
    
    return {
      getList: getAllPeople,
      post: postPerson
    }
  }
})();