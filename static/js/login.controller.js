(function () {
  angular
    .module('scrumboard.demo')
    .controller('LoginController', ['$scope', '$http', '$location', LoginController])

  function LoginController ($scope, $http, $location) {
    $scope.login = function () {
      $http
        .post('/auth_api/login', $scope.user)
        .then(function(response) {
          console.log('login success! response =>', response)
          $location.url('/')
        })
        .catch(function (error) {
          console.error('login error! error =>', error)
          $scope.loginError = error.data.message || 'DEFAULT invalid username/password combination'
        })
    }
  }
})()