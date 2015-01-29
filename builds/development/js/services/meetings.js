myApp.factory('Meetings', function($firebase,
  $firebaseAuth, FIREBASE_URL, $rootScope, $location) {

	if ($rootScope.currentUser !== null) {

	  var ref = new Firebase(FIREBASE_URL + '/users/' +
	    $rootScope.currentUser.$id + '/meetings');
	  var meetingsArray = $firebase(ref).$asArray();

	  var myObject = {
	    countMeetings: function() {
	      meetingsArray.$loaded().then(function(data) {
	        $rootScope.howManyMeetings = meetingsArray.length;
	      }); // meetings Array Loaded

	      meetingsArray.$watch(function(event) {
	        $rootScope.howManyMeetings = meetingsArray.length;
	      });
	    }
	  }; //myObject

	  return myObject;
  } // user exists
});