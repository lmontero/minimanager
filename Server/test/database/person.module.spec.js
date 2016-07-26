/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var personModule = require('../../database/person.module');
  
  describe('Person Module', function () {
    describe('insertOne()', function () {
      it('Should return the same person with an id when a new person is sent.', function () {
        var peopleCollection = [];
        var lastPersonId = 0;
        var people = personModule(peopleCollection, lastPersonId);
        var person = {
          FirstName : "Julian",
          LastName : "Fernandez Rodriguez",
          CI : "456123121"
        };
        var expectedId = 1;

        return people.insertOne(person)
          .then(function (result) {
            assert.equal(expectedId, result._id);
          });
      });

      it('Should return an object with error message when person collection is undefined.', function () {
        var peopleCollection = undefined;
        var lastPersonId = 0;
        var people = personModule(peopleCollection, lastPersonId);
        var person = {
          FirstName : "Julian",
          LastName : "Fernandez Rodriguez",
          CI : "456123121"
        };
        var expectedMessage = 'Error, something was happened with people collection.';
        return people.insertOne(person)
          .catch(function (error) {
            assert.equal(expectedMessage, error.message);
          });
      });
    });
    
    describe('find()', function () {
      it('Should return all people collection when is no sent an object with parameters.', function () {
        var peopleCollection =
          [{
            _id: "1",
            FirstName : "Julian",
            LastName : "Fernandez Rodriguez",
            CI : "456123121"
          },
            {
              _id: "2",
              FirstName : "Ñuflo",
              LastName : "Jimenez Apaza",
              CI : "6541214"
            }];
        var expectedCollection =
          [{
            _id: "1",
            FirstName : "Julian",
            LastName : "Fernandez Rodriguez",
            CI : "456123121"
          },
            {
              _id: "2",
              FirstName : "Ñuflo",
              LastName : "Jimenez Apaza",
              CI : "6541214"
            }];
        var lastPersonId = 2;
        var people = personModule(peopleCollection, lastPersonId);
    
        return people.find()
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });
  
      it('Should return all people collection when is sent an object with undefined parameters.', function () {
        var peopleCollection =
          [{
            _id: "1",
            FirstName : "Julian",
            LastName : "Fernandez Rodriguez",
            CI : "456123121"
          },
            {
              _id: "2",
              FirstName : "Ñuflo",
              LastName : "Jimenez Apaza",
              CI : "6541214"
            }];
        var expectedCollection =
          [{
            _id: "1",
            FirstName : "Julian",
            LastName : "Fernandez Rodriguez",
            CI : "456123121"
          },
            {
              _id: "2",
              FirstName : "Ñuflo",
              LastName : "Jimenez Apaza",
              CI : "6541214"
            }];
        var parameters = {};
        var people = personModule(peopleCollection, 0);
        return people.find(parameters)
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });
  
      it('Should return an expected people collection when is sent parameters.', function () {
        var peopleCollection =
          [{
            _id: "1",
            FirstName : "Julian",
            LastName : "Fernandez Rodriguez",
            CI : "456123121"
          },
            {
              _id: "2",
              FirstName : "Ñuflo",
              LastName : "Jimenez Apaza",
              CI : "6541214"
            }];
        var expectedCollection =
          [{
            _id: "2",
            FirstName: "Ñuflo",
            LastName: "Jimenez Apaza",
            CI: "6541214"
          }];
        var parameters = {
          _id: "2",
          FirstName: "Ñuflo",
          LastName: "Jimenez Apaza",
          CI: "6541214"
        };
        var lastPersonId = 2;
        var people = personModule(peopleCollection, lastPersonId);
    
        return people.find(parameters)
          .then(function (result) {
            assert.sameDeepMembers(expectedCollection, result);
          });
      });
  
      it('Should return an object with error message when is sent a wrong person collection.', function () {
        var peopleCollection = undefined;
        var expectedError = {
          message: 'Error, something was happened with people collection.'
        };
        var people = personModule(peopleCollection, 0);
        return people.find()
          .catch(function (error) {
            assert.deepEqual(expectedError, error);
          });
      });
    });
  });
}

module.exports = execute;