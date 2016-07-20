/**
 * Created by Luis Montero on 7/19/2016.
 */
(function () {
  'use strict';
  angular
    .module('component')
    .controller('ComponentController', ComponentController);
  
  ComponentController.$inject = [
    'components',
    'componentRestService',
    '$window'
  ];
  
  function ComponentController(components, componentRestService, $window) {
    var vm = this;
    vm.components = components.data;

    setFocus('nameId');
    var component = {
      Name: '',
      RoomId: ''
    };

    vm.component = component;

    vm.saveComponent = function () {
      componentRestService.post(vm.component)
        .then(function (result) {
          components.data.push(result.data);
          clearFields();
          setFocus('nameId');
        })
        .catch(function (error) {
          console.log('component post failed...');
          console.log(error);
        });
    };

    function clearFields() {
      component.Name = '';
      component.RoomId = '';
    }

    function setFocus(id) {
      var element = $window.document.getElementById(id);
      if (element) {
        element.focus();
      }
    }
  }
})();