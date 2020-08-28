(function () {
  angular
    .module('scrumboard.demo', ['ngRoute'])
    .controller('ScrumboardController', ['$scope', '$http', '$location', ScrumboardController])

  function ScrumboardController ($scope, $http, $location) {
    $scope.isEditting = false
    $scope.showNewCardForm = false
    $scope.showFilters = false
    $scope.filterBy = ''
    
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

    $scope.logout = function () {
      $http
        .get('/auth_api/logout')
        .then(function (response) {
          console.log('logout success! response =>', response)
          $location.url('/login')
        })
        .catch(console.error)
    }
  }
})()
