myApp.factory('Authentication', function($firebase, 
  $firebaseSimpleLogin, FIREBASE_URL, $location) {

  var ref = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(ref);

  var myObject = {

    login : function(user) {
      return simpleLogin.$login('password', {
        email: user.email,
        password: user.password
      });
    }, //login

    register : function(user) {
      return simpleLogin.$createUser(user.email, user.password)
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
      return simpleLogin.$logout();
    } //logout


  } //myObject

  return myObject;
});