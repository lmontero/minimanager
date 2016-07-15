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
    'people',
    'personRestService'
  ];

  function PersonController($scope, people, personRestService) {
    console.log(people);
    console.log('people controller');
    
    $scope.people = people.data;
    
    var fName = '';
    var lName = '';
    var cii = '';
    
    $scope.person = {
      firstName: fName,
      lastName: lName,
      ci: cii
    };
    
    $scope.savePerson = function () {
      console.log('saving person...');
      console.log(personRestService);
      personRestService.post($scope.person)
        .then(function (result) {
          console.log('person post success...');

        })
        .catch(function (error) {
          console.log('person post failed...');
          console.log(error);
        });
    }
  }
})();