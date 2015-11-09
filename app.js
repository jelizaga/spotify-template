// Empty data variable to be filled upon search.
var data;
var dataTwo;
// Spotify API URL.
var baseUrl = "https://api.spotify.com/v1/search?type=track&query=";
// Initializing angular app; joelsSpotify.
var joelsSpotify = angular.module("joelsSpotify", []);

// $scope is literally the scope of the angular.js application.
// $http is the variable that contains the AJAX service of angular.js.
var myCtrl = joelsSpotify.controller('myCtrl', function($scope, $http) {

  $scope.audioObject = {};

  // userSearch gets songs according to the track in #searchBar.
  $scope.userSearch = function() {

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
      $(".albumDiv").fadeOut(1000);
      $http.get(baseUrl + $scope.track).success(function(response){
        data = $scope.tracks = response.tracks.items
      })
      $(".songDiv").fadeIn(1000);

    }

  }

  // artistSearch receives an artistName whenever the user selects the name of an artist.
  // It changes the tracklist to include the results Spotify brings back when queried for this
  // artist.
  $scope.artistSearch = function(artistName) {

    $("#statusBox").empty();
    var status = "<text class='status'>Artist searched: \"" + artistName + ".\"</text>";
    $("#statusBox").append(status);
    (".albumDiv").fadeOut(1000);
    $http.get(baseUrl + artistName).success(function(response){
      data = $scope.tracks = response.tracks.items
    })
    $(".songDiv").fadeIn(1000);

  }

  // albumSearch receives an albumId whenever the user selects the name of an album.
  // It changes the tracklist to include the results Spotify brings back when queried for this
  // album.
  $scope.albumSearch = function(albumName, albumId) {

    $("#statusBox").empty();
    var status = "<text class='status'>Album searched: \"" + albumName + ".\"</text>";
    $("#statusBox").append(status);
    $(".songDiv").fadeOut(1000);
    var albumUrl = "https://api.spotify.com/v1/albums/";
    $http.get(albumUrl + albumId).success(function(response){
      data = $scope.altracks = response.tracks.items
      data = $scope.al = response
    })
    $(".albumDiv").fadeIn(1000);

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
      var status = "<text class='status'>You're now listening to \"" + songName + ",\" by " + songArtist + ". Enjoy.</text>";
      $("#statusBox").append(status);
    }
  }

})

// Add tool tips to anything with a title property.
$("body").tooltip({

    selector: "[title]"

});
