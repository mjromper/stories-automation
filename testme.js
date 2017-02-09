var sense = require('./sense-server.js');
var Q = require('q');
var open = require("open");


var appId = "65d92b03-564e-4b4b-b50a-7e51eca734a4",
	sheetId = "9e00846e-6f4d-4ec7-8c45-ba13ba64d459",
	objectId = "pvtJnKf";

var slideId = "GWzULj";

var fieldName = 'dim_device_app_combo',
	selectionPosition = [ [0], [1], [2], [3], [4], [5] ];

var loopThroughSelections = function( positions ) {
	var p = Q();
	positions.forEach(function(pos, i) {
	    p = p.then(function() {
	      	return sense.prepareSelection( appId, fieldName, pos, i, sheetId, objectId, slideId )
	    });
	} );
	return p;
};

loopThroughSelections( selectionPosition ).then( function() {
	console.log("ALL done!");
	process.exit();
} );
