/**
 * Created by Luis Montero on 7/14/2016.
 */
'use strict';

function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

module.exports = {
  getClonedObject: clone
};