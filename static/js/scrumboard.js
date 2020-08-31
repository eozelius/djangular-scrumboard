(function () {
  angular
    .module('scrumboard.demo', ['ngRoute'])
    .controller('ScrumboardController', ['$scope', '$http', 'Login', ScrumboardController])

  function ScrumboardController ($scope, $http, Login) {
    $scope.isEditting = false
    $scope.showNewCardForm = false
    $scope.showFilters = false
    $scope.filterBy = ''
    $scope.logout = Login.logout
    $scope.isLoggedIn = Login.isLoggedIn

    // get initial data
    $scope.data = []
    $http
      .get('/scrumboard/lists/')
      .then(function (response) {
        $scope.data = response.data
      })
      .catch(console.error)

    // add card
    $scope.addCard = function (list, title, description, businessValue, points) {
      $http
        .post('/scrumboard/cards/', {
          title: title,
          description: description,
          list_name: list.id,
          business_value: businessValue,
          story_points: points
        })
        .then(function (response) {
          console.log("success() response => ", response)
          list.cards.unshift(response.data)

          $scope.title = ''
          $scope.description = ''
          $scope.businessValue = 0
          $scope.storyPoints = 0
        })
        .catch(console.error)
    }
  }
})()
