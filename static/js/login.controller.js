(function () {
  angular
    .module('scrumboard.demo')
    .controller('LoginController', ['$scope', '$location', 'Login', LoginController])

  function LoginController ($scope, $location, Login) {
    $scope.login = function () {
      Login
        .login($scope.user)
        .then(function () {
          $location.url('/')
        })
        .catch(function () {
          $scope.loginError = 'asdf Invalid username/password combination'
        })
    }

    if (Login.isLoggedIn()) {
      $location.url('/')
    }
  }
})()