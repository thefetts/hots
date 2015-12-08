var app = angular.module('hots', []);

app.controller('mainController', function($scope) {
	$scope.characters = undefined;

	$scope.readFile = function(evt) {
		var file = evt.target.files[0];

	  if (file) {
		  var r = new FileReader();

		  r.onload = function(e) {
		    var contents = e.target.result;
		    getCharacterCounts(contents);
		  };

	    r.readAsText(file);
		}
	};

	function getCharacterCounts(contents) {
		var characters = {};
		var lines = contents.split('\n');
		for(var i = 1; i < lines.length - 3; i++) {
			var line = lines[i];
			var data = line.split(',');
			var game = data[1].split('_');
			var players = game[2].split(';');
			for(var j in players) {
				var player = players[j].split('-');
				var character = player[1];

				if(!characters[character]) {
					characters[character] = 1;
				} else {
					characters[character]++;
				}
			}
		}

		$scope.characters = characters;
		$scope.$digest();
	}
});

app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});
