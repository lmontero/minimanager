/**
 * Created by Luis Montero on 7/14/2016.
 */
'use strict';

var cloner = require('./json.clone');

function parseErrorFunction(data, title, detail) {
  return {
    errors: [{
      code: data,
      title: title,
      detail: detail
    }]
  };
}

function parseManySuccessFunction(collection, entityName) {
  var datas = [];
  collection.forEach(function (item) {
    datas.push(parseOneSuccessFunction(item, entityName).data);
  });

  return {
    data: datas
  };
}

function parseOneSuccessFunction(item, entityName) {
  var anotherItem = cloner.getClonedObject(item);
  delete anotherItem._id;
  return {
    data: {
      _id: item._id + '',
      type: entityName,
      attributes: anotherItem
    }
  };
}

module.exports = {
  parseError: parseErrorFunction,
  parseSuccessOne: parseOneSuccessFunction,
  parseSuccessMany: parseManySuccessFunction
};