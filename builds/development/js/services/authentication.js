myApp.factory('Authentication', function($firebase,
  $firebaseAuth, FIREBASE_URL, $rootScope, $location) {

  var ref = new Firebase(FIREBASE_URL);
  $rootScope.auth = $firebaseAuth(ref);

  var myObject = {

    login : function(user) {

      var userRef = new Firebase(FIREBASE_URL + 'users/' + user.uid);
      var userObj = $firebase(userRef).$asObject();

      userObj.$loaded().then(function() {
        $rootScope.currentUser = userObj;
      });

      return $rootScope.auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    }, //login

    register : function(user) {
      return $rootScope.auth.$createUser(user.email, user.password)
      .then(function(regUser){
        var ref = new Firebase(FIREBASE_URL + 'users');
        var firebaseUsers = $firebase(ref);

        var userInfo = {
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }

        firebaseUsers.$set(regUser.uid, userInfo);
      }); //add user
    }, //register

    logout : function() {
      return $rootScope.auth.$unauth();
    }, //logout

    signedIn: function() {
      return $rootScope.auth.$getAuth() != null;
    }

  } //myObject

  $rootScope.signedIn = function() {
    return myObject.signedIn();
  }

  return myObject;
});
