myApp.controller('StatusController', function(
  $scope, $rootScope, Authentication) {

  $scope.logout = function() {
    Authentication.logout();
  }; //logout

}); //StatusController
