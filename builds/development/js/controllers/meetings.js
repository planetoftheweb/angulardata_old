myApp.controller('MeetingsController', 
  function($scope, $rootScope, $firebase) {

  var ref = new Firebase('https://attendanceldcapp.firebaseio.com/meetings');
  var meetingsInfo = $firebase(ref);
  var meetingsObj = $firebase(ref).$asObject();
  var meetingsArray = $firebase(ref).$asArray();

  meetingsObj.$loaded().then(function(data) {
    $scope.meetings = meetingsObj;
  }); // meetings Object Loaded

  meetingsArray.$loaded().then(function(data) {
    $rootScope.howManyMeetings = meetingsArray.length;
  }); // meetings Array Loaded

  meetingsArray.$watch(function(event) {
    $rootScope.howManyMeetings = meetingsArray.length;
  });

  $scope.addMeeting=function() {
    meetingsInfo.$push({
      name: $scope.meetingname,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.meetingname = '';
    });
  } //addmeeting

  $scope.deleteMeeting=function(key) {
    meetingsInfo.$remove(key);
  } //deletemeeting

}); //MeetingsController