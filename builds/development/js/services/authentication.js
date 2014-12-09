myApp.factory('Authentication', function($firebase,
  $firebaseAuth, FIREBASE_URL, $rootScope, $location) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var myObject = {

    login: function(user) {

      var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseAuth(ref);

      auth.$onAuth(function(authUser) {
        if (authUser) {

          var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
          var user = $firebase(ref).$asObject();

          $rootScope.currentUser = user;

        } else {
          $rootScope.currentUser = null;
        }
      }); // Check user status 

      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    }, //login

    register: function(user) {
      return auth.$createUser(user.email, user.password)
        .then(function(regUser) {
          var ref = new Firebase(FIREBASE_URL + 'users');
          var firebaseUsers = $firebase(ref);

          var userInfo = {
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          };

          firebaseUsers.$set(regUser.uid, userInfo);
        }); //add user
    }, //register

    logout: function() {
      return auth.$unauth();
    }, //logout

    signedIn: function() {
      return auth.user !== null;
    }

  }; //myObject

  //add the function to the rootScope

  $rootScope.signedIn = function() {
    return myObject.signedIn();
  };

  return myObject;
});
