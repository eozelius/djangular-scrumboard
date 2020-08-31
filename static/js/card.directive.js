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
        $scope.destinationList = null
        var url = `/scrumboard/cards/${$scope.card.id}/`

        $scope.updateCard = function () {          
          console.log('[ card.dir.js ] updateCard() $scope.card => ', $scope.card)

          return $http
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
              .then(response => {
                console.log('deleteCard() success. response => ', response)
                removeCardFromList($scope.card, $scope.list)
              })
              .catch(console.error)
          }
        }

        function removeCardFromList (card, list) {
          list.cards.splice(list.cards.indexOf(card), 1)
        }

        $scope.moveCard = function () {
          if (!$scope.destinationList) {
            return
          }

          $scope.card.list_name = $scope.destinationList.id
          $scope
            .updateCard()
            .then(function (response) {
              console.log('update Success! response => ', response)
              removeCardFromList($scope.card, $scope.list)
              $scope.destinationList.cards.unshift($scope.card)
            })
        }
      }]
    }
  }
})()