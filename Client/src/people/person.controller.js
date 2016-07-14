/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('person')
    .controller('PersonController', PersonController);

  PersonController.$inject = [
    '$scope',
    'personRestService'
  ];

  function PersonController($scope, people) {
    console.log(people);
    console.log('people controller');
  }
})();