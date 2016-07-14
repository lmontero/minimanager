/**
 * Created by Luis Montero on 7/12/2016.
 */
(function () {
  'use strict';
  angular
    .module('common')
    .constant('BASE_URL', setBaseUrl());

  function setBaseUrl() {
    return 'http://localhost:8080';
  }
})();