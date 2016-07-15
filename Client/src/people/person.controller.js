/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('person')
    .controller('PersonController', PersonController);

  PersonController.$inject = [
    'people',
    'personRestService',
    '$window'
  ];

  function PersonController(people, personRestService, $window) {
    var vm = this;
    vm.people = people.data;
  
    setFocus('fNameId');
    var person = {
      FirstName: '',
      LastName: '',
      CI: ''
    };
    
    vm.person = person;
    
    vm.savePerson = function () {
      personRestService.post(vm.person)
        .then(function (result) {
          people.data.push(result.data);
          clearFields();
          setFocus('fNameId');
        })
        .catch(function (error) {
          console.log('person post failed...');
          console.log(error);
        });
    };

    function clearFields() {
      person.FirstName = '';
      person.LastName = '';
      person.CI = '';
    }
    
    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();