(function () {
  angular
    .module('scrumboard.demo')
    .service('Login', ['$http', '$location', Login])

  function Login ($http, $location) {
    this.login = login
    this.logout = logout
    this.isLoggedIn = isLoggedIn
    this.redirectIfNotLoggedIn = redirectIfNotLoggedIn

    function login (credentials) {
      return $http.post('/auth_api/login', credentials).then(function(response) {
        console.log('logged in successfully')
        localStorage.currentUser = JSON.stringify(response.data)
      })
      
    }

    function logout () {
      delete localStorage.currentUser
      $http.get('/auth_api/logout').then(function(response) {
        console.log('logout successful')
        $location.url('/login')
      })
    }

    function isLoggedIn () {
      return !!localStorage.currentUser
    }

    function redirectIfNotLoggedIn () {
      if (!isLoggedIn) {
        $location.url('/login')
      }
    }
  }
})()