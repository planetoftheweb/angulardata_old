myApp.controller('RegistrationController', 
  function($scope, $firebaseSimpleLogin, $location) {

  var ref = new Firebase('https://attendanceldcapp.firebaseio.com/');
  var simpleLogin = $firebaseSimpleLogin(ref);
  
  $scope.login = function() {
    simpleLogin.$login('password', {
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(user) {
      $location.path('/meetings');
    }, function(error) {
      $scope.message = error.toString();
    });
  } //login

  $scope.register = function() {
    $location.path('/meetings');
  } //login

}); //RegistrationController