myApp.controller('CheckInsController', function(
  $scope, $rootScope, $firebase, $routeParams,
  $firebaseSimpleLogin, FIREBASE_URL) {

  $scope.whichmeeting = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;

  var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');

  $scope.addCheckin = function() {
    var checkinsObj = $firebase(ref);

    var myData = {
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname,
      email: $scope.user.email,
      date: Firebase.ServerValue.TIMESTAMP
    };

    checkinsObj.$push(myData).then(function() {
      //send to our list of checkins page
    }); //data sent to firebase.
  } //addCheckin

}); //CheckInsController