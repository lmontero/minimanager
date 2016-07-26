/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var componentModule = require('../../database/component.module');
  
  describe('Component Module', function () {
    describe('insertOne()', function () {
      /*it('Should return the same component with an id when a new component is sent.', function () {
        var componentsCollection = [];
        var lastComponentId = 0;
        var components = componentModule(componentsCollection, lastComponentId);
        var component = {
          FirstName : "Julian",
          LastName : "Fernandez Rodriguez",
          CI : "456123121"
        };
        var expectedId = 1;

        return components.insertOne(component)
          .then(function (result) {
            assert.equal(expectedId, result._id);
          });
      });

      it('Should return an object with error message when component collection is undefined.', function () {
        var componentsCollection = undefined;
        var lastComponentId = 0;
        var components = componentModule(componentsCollection, lastComponentId);
        var component = {
          FirstName : "Julian",
          LastName : "Fernandez Rodriguez",
          CI : "456123121"
        };
        var expectedMessage = 'Error, something was happened with components collection.';
        return components.insertOne(component)
          .catch(function (error) {
            assert.equal(expectedMessage, error.message);
          });
      });*/
    });

    describe('find()', function () {
      
    });
  });
}

module.exports = execute;