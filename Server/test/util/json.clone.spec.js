/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var jsonCloneModule = require('../../util/json.clone');
  
  describe('Json clone', function () {
    describe('CloneObject()', function () {
      it('Should return an object with the same values when is cloned.', function () {
        var expected = {
          name: 'Rumi',
          age: 15
        };
        
        var result = jsonCloneModule.getClonedObject(expected);
        
        assert.equal(expected.name, result.name);
        assert.equal(expected.age, result.age);
      });
    });
  });
}

module.exports = execute;