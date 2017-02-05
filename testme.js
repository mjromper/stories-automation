var sense = require('./sense-server.js');

var appId = "65d92b03-564e-4b4b-b50a-7e51eca734a4",
	sheetId = "QNPVh",
	objectId = "XveYr";

var fieldName = 'dim_device_app_combo',
	selectionPosition = [0];


sense.prepareSelection(appId, fieldName, selectionPosition)
	.then( function() {
		return sense.createSnapshotInNewStory( appId, sheetId, objectId );
	})
	.then( function() {
		console.log("All good!!");
		process.exit();
	});