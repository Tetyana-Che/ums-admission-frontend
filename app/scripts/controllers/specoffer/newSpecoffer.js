'use strict';


angular
  .module('admissionSystemApp')
  .controller('NewSpecofferCtrl', ['$scope', '$stateParams', '$location', 'SpecoffersService',
    'DictionariesSvc', 'progressBarService', '$state', 'baseSpecofferData',
    function ($scope, $stateParams, $location, SpecoffersService, DictionariesSvc, progressBarService, $state, baseSpecofferData) {
      $scope.entireSpecoffer = {};
      $scope.entireSpecoffer.subjects = [];
      $scope.entireSpecoffer.benefits = [];
      $scope.entireSpecoffer.waves = [];
      $scope.entireSpecoffer.specoffer = {};

      $scope.brosweOrEditSpecoffer = function (specofferId) {
        SpecoffersService.getEntireSpecoffer(specofferId).then(function (res) {
          _.merge($scope.entireSpecoffer.subjects, res.subjects);
          _.merge($scope.entireSpecoffer.benefits, res.benefits);
          _.merge($scope.entireSpecoffer.specoffer, res.specoffer);
          _.merge($scope.entireSpecoffer.waves, res.waves);

        });
      };

      if ($stateParams.id) {
        $scope.brosweOrEditSpecoffer($stateParams.id);
      } else {
        SpecoffersService.clearCopy();
      }

      $scope.sendToServer = function (entireSpecoffer) {
        $scope.entireSpecoffer.specoffer.note = 'some note';
        SpecoffersService.addOrEditSpecoffer(entireSpecoffer).then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $location.path('/#/specoffer.list');
        });
      };

      $scope.deleteSpecoffer = function () {
        SpecoffersService.deleteEntireSpecoffer().then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $location.path('/#/list-specoffer');
        });
      };

      $scope.specofferTabs = angular.copy(baseSpecofferData.tabs);

      _.each($scope.specofferTabs, function (item) {
        item.active =  $state.current.name === item.route.new || $state.current.name === item.route.edit;
      });

      $scope.go = function (route) {
        if ($stateParams.id) {
          $state.go(route.edit, {
            id: $stateParams.id
          });
        } else {
          $state.go(route.new);
        }
      };

      progressBarService.inputQuantity = 0;
      progressBarService.value = 0;
      if ($state.is('root.specoffer.new.main') || $state.is('root.specoffer.edit.main')) {
        $scope.$on('valBubble', function (evt, args) {  // using directive, which is responsible for changes in each input
          if (args.isValid) {                           // checking if input is valid
            progressBarService.value++;                 // value increases if the field is valid
          }
          else if (progressBarService.value > 0) {      // value decreases if input content's was deleted
            progressBarService.value--;
          }
          else {
            progressBarService.inputQuantity++;
          }
        });
      }
    }]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
    }]);
