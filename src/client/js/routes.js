app.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
    })
    .when('/register', {
      templateUrl: 'partials/signup.html',
      controller: 'signupController',
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
    })
    .when('/logout', {

    })
    .otherwise({redirectTo: '/login'});
    // $httpProvider.interceptors.push('AuthInterceptor');
});
