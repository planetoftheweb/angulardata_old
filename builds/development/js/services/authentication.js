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
    } //login
  } //myObject

  return myObject;
});