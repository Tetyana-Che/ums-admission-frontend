'use strict';

describe('Controller: TabAdressesCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var TabAdressesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabAdressesCtrl = $controller('TabAdressesCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
