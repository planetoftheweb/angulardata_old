myApp.controller('StatusController', function(
  $scope, $rootScope,
    $location, $firebase,$firebaseAuth, FIREBASE_URL, Authentication) {

  $scope.logout = function() {
    Authentication.logout();
  } //logout

  $rootScope.auth.$onAuth(function(authUser) {
    if (authUser) {
      var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
      var user = $firebase(ref).$asObject();

      user.$loaded().then(function() {
        $rootScope.currentUser = user;
      });
    } else {
      // console.log('I called you!')
      $location.url('localhost:8000/#/login');
      $rootScope.currentUser = null;
    }
  }); //login

}); //StatusController
