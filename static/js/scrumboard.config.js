(function () {
  angular
    .module('scrumboard.demo')
    .config(['$routeProvider', config])
    .run(['$http', run])

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/html/scrumboard.html',
        controller: 'ScrumboardController'
      })
      .when('/djangular-login', {
        templateUrl: '/static/html/login.html',
        controller: 'LoginController'
      })
      .otherwise('/')
  }

  function run ($http) {
    $http.defaults.xsrfHeaderName = 'x-csrftoken'
    $http.defaults.xsrfCookieName = 'csrftoken'
  }
})()