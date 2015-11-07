// Empty data variable to be filled upon search.
var data;
// Spotify API URL.
var baseUrl = "https://api.spotify.com/v1/search?type=track&query=";
// Initializing angular app; joelsSpotify.
var joelsSpotify = angular.module("joelsSpotify", []);

// $scope is literally the scope of the angular.js application.
// $http is the variable that contains the AJAX service of angular.js.
var myCtrl = joelsSpotify.controller('myCtrl', function($scope, $http) {

  $scope.audioObject = {};

  // getsSongs gets songs according to the track in #search.
  $scope.getSongs = function() {

    // If the search box is empty, don't perform a search and display a warning.
    if ($("#searchBar").val() == "") {

      $("#statusBox").empty();
      var warning = "<text class='status warning'>You can't search for something that doesn't exist!</text>";
      $("#statusBox").append(warning);
    // If not, search for the track.
    } else {

      $("#statusBox").empty();
      var status = "<text class='status'>Spotify searched. Click to sample a song.</text>";
      $("#statusBox").append(status);
      $http.get(baseUrl + $scope.track).success(function(response){
        alert(response.track.items);
        data = $scope.tracks = response.tracks.items
      })

    }

  }

  $scope.play = function(song) {

    if ($scope.currentSong == song) {

      $scope.audioObject.pause();
      $scope.currentSong = false;
      return

    } else {

      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song

    }
  }

})

// Add tool tips to anything with a title property
$("body").tooltip({

    selector: "[title]" + "-" + "[artist]"

});
