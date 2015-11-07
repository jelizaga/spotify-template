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
    // If not, search for the track.
    if ($("#searchBar").length === 0) {
      var warning = "<text class='warning'>Empty searches are invalid.</text>";
      $("#searchWarning").append(warning);
    } else {
      $http.get(baseUrl + $scope.track).success(function(response){
        data = $scope.tracks = response.tracks.items
      })
      alert(data);
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
