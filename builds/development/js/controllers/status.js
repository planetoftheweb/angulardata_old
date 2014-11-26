myApp.controller('StatusController', function(
  $scope, $rootScope,
    $location, $firebase,$firebaseAuth, FIREBASE_URL) {

  $scope.logout = function() {
    Authentication.logout();
    $location.path('/login');
  } //logout

  $rootScope.$onAuth(function(authUser) {
    var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
    var user = $firebase(ref).$asObject();

    user.$loaded().then(function() {
      $rootScope.currentUser = user;
    });
  }); //login

  $rootScope.$on('logout', function(e, authUser) {
    $rootScope.currentUser = null;
  }); //login

}); //StatusController