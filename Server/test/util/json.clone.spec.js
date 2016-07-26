/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var jsonCloneModule = require('../../util/json.clone');
  
  describe('Json clone', function () {
    describe('CloneObject()', function () {
      it('Should return an object with the same values when is cloned.', function () {
        var target = {
          name: 'Rumi',
          age: 15
        };
        
        var expected = {
          name: 'Rumi',
          age: 15
        };
        
        var result = jsonCloneModule.getClonedObject(target);
        
        assert.deepEqual(result, expected);
      });
    });
  });
}

module.exports = execute;