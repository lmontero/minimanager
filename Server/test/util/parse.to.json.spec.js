/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';

  var jsonParser = require('../../util/parse.to.json');

  describe('Json Parser', function () {
    describe('parseErrorFunction()', function () {
      it('Should return a correct json error object when an object with message is sent.', function () {
        var code = { message: 'A same primary key was found in people table' };
        var title = 'Post error';
        var detail = 'An error was happened trying save a new person';
        var expected = {
          errors: [{
            code: code.message,
            title: title,
            detail: detail
          }]
        };

        var result = jsonParser.parseError(code, title, detail);
        assert.equal(expected.errors[0].code, result.errors[0].code);
        assert.equal(expected.errors[0].title, result.errors[0].title);
        assert.equal(expected.errors[0].detail, result.errors[0].detail);
      });

      it('Should return a json object with undefined code when an object without message object is sent.', function () {
        var code = { mess: 'A same primary key was found in people table' };
        var title = 'Post error';
        var detail = 'An error was happened trying save a new person';
        var expected = undefined;

        var result = jsonParser.parseError(code, title, detail);
        assert.equal(expected, result.errors[0].code);
      });
    });
    
    describe('parseOneSuccessFunction()', function () {
      it('Should return a correct parsed json object when a correct entity object with its respective type is sent', function () {
        var countryEntity = {
          _id: '8',
          name: 'Babylon',
          longitude: '1.451654',
          latitude: '2.000454'
        };
        var entityName = 'country';
        var expectedCountry = {
          data: {
            _id: '8',
            type: 'country',
            attributes: {
              name: 'Babylon',
              longitude: '1.451654',
              latitude: '2.000454'
            }
          }
        };
        
        var result = jsonParser.parseSuccessOne(countryEntity, entityName);

        assert.equal(expectedCountry.data._id, result.data._id);
        assert.equal(expectedCountry.data.type, result.data.type);
        assert.equal(expectedCountry.data.attributes.name, result.data.attributes.name);
        assert.equal(expectedCountry.data.attributes.longitude, result.data.attributes.longitude);
        assert.equal(expectedCountry.data.attributes.latitude, result.data.attributes.latitude);
      });
    });

    describe('parseManySuccessFunction()', function () {
      it('Should return a success json object with a data collection when a correct collection and entity name is sent', function () {
        var firstCountry = {
          _id: '7',
          name: 'Egypt',
          longitude: '1.341564',
          latitude: '2.654123'
        };
        var secondCountry = {
          _id: '8',
          name: 'Babylon',
          longitude: '1.451654',
          latitude: '2.000454'
        };
        var entityName = 'country';
        var expectedCountries = {
          data: [
            {
              _id: '7',
              type: 'country',
              attributes: {
                name: 'Egypt',
                longitude: '1.341564',
                latitude: '2.654123'
              }
            },
            {
              _id: '8',
              type: 'country',
              attributes: {
                name: 'Babylon',
                longitude: '1.451654',
                latitude: '2.000454'
              }
            }
          ]
        };
        
        var result = jsonParser.parseSuccessMany([firstCountry, secondCountry], entityName);
        assert.equal(expectedCountries.data[0]._id, result.data[0]._id);
        assert.equal(expectedCountries.data[0].type, result.data[0].type);
        assert.equal(expectedCountries.data[0].attributes.name, result.data[0].attributes.name);
        assert.equal(expectedCountries.data[0].attributes.longitude, result.data[0].attributes.longitude);
        assert.equal(expectedCountries.data[0].attributes.latitude, result.data[0].attributes.latitude);
        assert.equal(expectedCountries.data[1]._id, result.data[1]._id);
        assert.equal(expectedCountries.data[1].type, result.data[1].type);
        assert.equal(expectedCountries.data[1].attributes.name, result.data[1].attributes.name);
        assert.equal(expectedCountries.data[1].attributes.longitude, result.data[1].attributes.longitude);
        assert.equal(expectedCountries.data[1].attributes.latitude, result.data[1].attributes.latitude);
      });
    });
  });
}

module.exports = execute;