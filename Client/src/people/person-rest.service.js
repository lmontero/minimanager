/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('person')
    .factory('personRestService', personRestService);

  personRestService.$inject = ['$http', 'BASE_URL'];

  function personRestService($http, BASE_URL) {
    console.log('people rest');
    function getPeople() {
      return $http.get(BASE_URL + '/people'/*, {headers: {'Accept': 'application/json'}}*/);
    }
    return {
      getPeople: getPeople
    };
  }
})();