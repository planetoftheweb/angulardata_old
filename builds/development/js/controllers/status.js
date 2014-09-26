myApp.controller('StatusController', function(
  $scope, $rootScope, $firebaseSimpleLogin) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
    console.log(authUser);
    $scope.userEmail = authUser.email;
  }); //$firebaseSimpleLogin:login
}); //StatusController