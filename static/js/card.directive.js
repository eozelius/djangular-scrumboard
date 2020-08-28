(function () {
  angular
    .module('scrumboard.demo')
    .directive('scrumboardCard', CardDirective)

  function CardDirective () {
    return {
      templateUrl: '/static/html/card.html',
      restrict: 'E',
      controller: ['$scope', '$http', function ($scope, $http) {
        $scope.updatedCardDescription = ''
        $scope.updatedCardTitle = ''
        
        var url = `/scrumboard/cards/${$scope.card.id}/`

        $scope.updateCard = function () {          
          $http
            .put(url, $scope.card)
            .then(function() {
              $scope.isEditting = false
            })
            .catch(console.error)
        }

        $scope.deleteCard = function () {
          if (confirm('are you sure?')) {
            $http
              .delete(url)
              .then(console.log)
              .catch(console.error)
          }
        }
      }]
    }
  }
})()