/**
 * Created by Luis Montero on 7/25/2016.
 */
function execute(assert) {
  'use strict';
  
  var parseDate = require('../../util/parse.date');
  
  describe('Date parser', function () {
    describe('ParseFromDateTimeToDate()', function () {
      it('Should return the same date when is sent a correct date time.', function () {
        var date = new Date(2016, 6, 24, 18, 25, 3, 50);
        var expected = '24/07/2016';
        
        var result = parseDate.parseFromDateTimeToDate(date);
        
        assert.equal(expected, result);
      });
    });
  });
}

module.exports = execute;