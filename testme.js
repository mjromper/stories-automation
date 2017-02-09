var sense = require('./sense-server.js');
var Q = require('q');

var appId = "65d92b03-564e-4b4b-b50a-7e51eca734a4",
	sheetId = "9e00846e-6f4d-4ec7-8c45-ba13ba64d459",
	objectId = "pvtJnKf";

var fieldName = 'dim_device_app_combo',
	selectionPosition = [ [0], [1], [2], [3] ];

var loopThroughSelections = function( positions ) {
	var p = Q();
	var storyName = "Story_Test_"+Math.round(Math.random()*100);
	positions.forEach(function(pos) {
	    p = p.then(function() {
	      	return sense.prepareSelection( appId, fieldName, pos, storyName+" ("+pos+")", sheetId, objectId )
	    });
	} );
	return p;
};

loopThroughSelections( selectionPosition ).then( function() {
	console.log("ALL done!");
	process.exit();
} );
