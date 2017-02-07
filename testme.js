var sense = require('./sense-server.js');

var appId = "65d92b03-564e-4b4b-b50a-7e51eca734a4",
	sheetId = "9e00846e-6f4d-4ec7-8c45-ba13ba64d459",
	objectId = "c06528b2-474e-4d6b-86de-ee18580e0f81";

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