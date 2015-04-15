'use strict';

/* Controllers */





paletteMakerApp.controller('paletteMakerController', ['$scope', 'colorPalette', function($scope, colorPalette){
  $scope.createColor = function(){
  }
  $scope.addUpdateBtn = colorPalette.btn;
  $scope.hue = colorPalette.hue;
  $scope.saturation = colorPalette.saturation;
  $scope.lightness = colorPalette.lightness;
  $scope.colorData = []
  $scope.$watch( "hue",
  function(newValue, oldValue) {
    if ( newValue !== oldValue ) {
      $scope.colorData2 = hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
    /*  $scope.hex = rgbToHex($scope.colorData2.r, $scope.colorData2.g, $scope.colorData2.b)*/
    }

  }
  );
   $scope.$watch( "saturation",
  function(newValue, oldValue) {
    if ( newValue !== oldValue ) {
      $scope.colorData2 = hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
    }
  }
  );
   $scope.$watch( "lightness",
  function(newValue, oldValue) {
    if ( newValue !== oldValue ) {
      $scope.colorData2 = hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
    }
  }
  );
  $scope.colorData2 = hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
  function hsl2rgb (h, s, l) {
    var r, g, b, m, c, x
    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0
    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6
    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))
    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))
    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }
    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    return { r: r, g: g, b: b, HEX: rgbToHex(r, g, b)}
  }
  function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  $scope.createColor = function() {
    $scope.colorData.push({first: hsl2rgb($scope.hue, $scope.saturation, $scope.lightness),second: hsl2rgb($scope.hue, $scope.saturation, $scope.lightness+10), third:  hsl2rgb($scope.hue, $scope.saturation, $scope.lightness + 20), rawhsl: [$scope.hue, $scope.saturation, $scope.lightness]});
  }; 

  $scope.editColor = function() {
    for(var i = 0; i < $scope.colorData.length; i++){ 
      if($scope.colorData[i].first.HEX === $scope.data.group2.first.HEX){
        $scope.hue = colorPalette.hue;
        $scope.saturation = colorPalette.saturation;
        $scope.lightness = colorPalette.lightness;
      }
    }
  };
  $scope.removeItem = function(HEX) {
    for(var i = 0; i < $scope.colorData.length; i++){ 
      if($scope.colorData[i].first.HEX === $scope.data.group2.first.HEX){
        $scope.colorData.splice(i, 1);
      }
    }
  };
  $scope.removeAll = function() {
    $scope.colorData = [];
  };
}]);
