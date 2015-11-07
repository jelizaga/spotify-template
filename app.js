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
        data = $scope.tracks = response.tracks.items
      })

    }

  }

  // Receives track.preview_url from angular.js; plays the track.
  $scope.play = function(song, songName, songArtist) {

    // If the song currently playing is the song clicked, the song will be unselected for play.
    if ($scope.currentSong == song) {

      $scope.audioObject.pause();
      $scope.currentSong = false;
      $("#statusBox").empty();
      var status = "<text class='status'>Song paused.</text>";
      $("#statusBox").append(status);
      return

    // Otherwise, if audioObject is not paused, pause it, play the selected song. The selected
    // song becomes the currentSong.
    } else {

      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play();
      $scope.currentSong = song;
      $("#statusBox").empty();
      var status = "<text class='status'>Song playing: \"" + songName + ",\" by " + songArtist + ". Enjoy.</text>";
      $("#statusBox").append(status);
    }
  }

})

// Add tool tips to anything with a title property
$("body").tooltip({

    selector: "[title]"

});
