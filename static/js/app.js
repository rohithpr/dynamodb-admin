(function() {
  var app = angular.module('dydb', [])

  app.directive('navigationBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/html/navigation-bar.html',
      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        this.showStates = function() {
          $rootScope.$broadcast('setSubCard', 'device_states')
        }
        this.showCommands = function() {
          $rootScope.$broadcast('setSubCard', 'device_operations')
        }
      }],
      controllerAs: 'NBController'
    }
  })

  app.directive('listTables', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/html/list-tables.html',
      controller: ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        var LTController = this
        LTController.tables = Object()
        $http.get('/api/listTables')
          .then(function(data) {
            for (var i = 0; i < data.data.TableNames.length; i++) {
              LTController.tables[i] = {
                tableName: data.data.TableNames[i],
                selected: false
              }
            }
          }, function(err) {
            console.log('Couldn\'t get tables')
          })

        LTController.toggleSelect = function(id) {
          LTController.tables[id].selected = !(LTController.tables[id].selected)
        }

        LTController.isSelected = function(id) {
          return LTController.tables[id].selected
        }
      }],
      controllerAs: 'LTController'
    }
  })

  var DeviceController = function($scope, $rootScope) {
    $scope.subCard = 'device_operations'

    $scope.$on('setSubCard', function(event, arg) {
      $scope.setSubCard(arg)
    })

    this.isSubCard = function(subCard) {
      return $scope.subCard === subCard
    }

    $scope.setSubCard = function(subCard) {
      $scope.subCard = subCard
    }

    // API call for this to keep things in sync?
    this.devices = {
      'Refrigerator': {
        operations: [
          {intent: 'Set temperature', arguments: 'Target temperature'},
          {intent: 'Query temperature', arguments: 'None'},
          {intent: 'Query contents', arguments: 'Contents'},
        ]
      },
      'Television': {
        operations: [
          {intent: 'Set volume', arguments: 'Target volume'},
          {intent: 'Increase volume', arguments: 'Number'},
          {intent: 'Decrease volume', arguments: 'Number'},
          {intent: 'Mute', arguments: 'None'},
          {intent: 'Set channel', arguments: 'Target channel'},
          {intent: 'Next channel', arguments: 'None'},
          {intent: 'Previous channel', arguments: 'None'},
        ]
      },
      'Phone': {
        operations: [
          {intent: 'Call', arguments: 'Person'},
          {intent: 'Play song', arguments: 'Song'},
          {intent: 'Start application', arguments: 'Application name'},
          {intent: 'Silent mode', arguments: 'None'},
          {intent: 'Normal mode', arguments: 'None'},
          {intent: 'Accept call', arguments: 'None'},
          {intent: 'Reject call', arguments: 'None'},
        ]
      }
    }
  }

  app.directive('deviceCards', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/angular-templates/device-cards.html',
      controller: ['$scope', '$rootScope', DeviceController],
      controllerAs: 'DeviceController'
    }
  })
})()
