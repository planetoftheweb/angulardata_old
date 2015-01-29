myApp.controller('MeetingsController',
  function($scope, $rootScope,$firebase,
    Authentication, Meetings, FIREBASE_URL) {

    if ($rootScope.currentUser !== null) {

      var ref = new Firebase(FIREBASE_URL + '/users/' +
        $rootScope.currentUser.$id + '/meetings');
      var meetingsInfo = $firebase(ref);
      var meetingsObj = $firebase(ref).$asObject();

      meetingsObj.$loaded().then(function(data) {
        $scope.meetings = meetingsObj;
      }); // meetings Object Loaded

      Meetings.countMeetings(); //Use the Meetings service

      $scope.addMeeting = function() {
        meetingsInfo.$push({
          name: $scope.meetingname,
          date: Firebase.ServerValue.TIMESTAMP
        }).then(function() {
          $scope.meetingname = '';
        });
      }; //addmeeting

      $scope.deleteMeeting = function(key) {
        meetingsInfo.$remove(key);
      }; //deletemeeting
    } // user exists
  }); //MeetingsController
