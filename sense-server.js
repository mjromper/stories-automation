var fs = require("fs"),
    path = require("path"),
    WebSocket = require("ws"),
    enigma = require("enigma.js"),
    qixSchema = require("./node_modules/enigma.js/schemas/qix/3.1/schema.json"),
    oDefs = require('./objectDefs.js');

var config = require('./config.json');
var certificateDir = "./certs";

var connConfig = {
    Promise: global.Promise,
    schema: qixSchema,
    session: config.session,
    createSocket: function(url) {
        return new WebSocket(url, {
            ca: [ fs.readFileSync(path.resolve(__dirname, certificateDir, "root.pem")) ],
            key: fs.readFileSync(path.resolve(__dirname, certificateDir, "client_key.pem")),
            cert: fs.readFileSync(path.resolve(__dirname, certificateDir, "client.pem")),
            headers: {
                "X-Qlik-User": "UserDirectory=" + config.user.dir + ";UserId=" + config.user.name
            }
        });
    }
};

function _getEnigmaService() {
    return enigma.getService("qix", connConfig);
}

function prepareSelection(appId, fieldName, selectPos, callback) {
    return _getEnigmaService()
        .then( function(qix) {
            return qix.global.openApp(appId);
        })
        .then( function( app ) {

            var lo = {
                "qInfo": {
                    "qType": "Chart"
                },
                "qListObjectDef": {
                    "qStateName": "$",
                    "qLibraryId": "",
                    "qDef": {
                        "qFieldDefs": [fieldName],
                        "qFieldLabels": [fieldName + " Label"],
                        "qSortCriterias": [
                            { "qSortByLoadOrder": 1 }
                        ]
                    },
                    "qInitialDataFetch": [{
                        "qTop": 0,
                        "qHeight": 1,
                        "qLeft": 0,
                        "qWidth": 1
                    }]
                }
            }
            return app.createSessionObject(lo);
        })
        .then(function(sessionObject) {
            return sessionObject.selectListObjectValues("/qListObjectDef", selectPos, false).then(function() {
                return sessionObject;
            });
        })
        .then(function(sessionObject) {
            return sessionObject.getListObjectData("/qListObjectDef", [{
                "qTop": 0,
                "qLeft": 0,
                "qHeight": 3,
                "qWidth": 1
            }]);
        })
        .catch( function(err) {
            console.log("Error in prepareSelection", err);
            process.exit();
        } );
}

function getObjectLayout(app, objectId) {
    return app.getObject(objectId).then(function(o) {
        return o.getLayout();
    });
}

function createSnapshotInNewStory( appId, sheetId, objectId ) {
    var storyName = "Story_Test_" + Math.round(Math.random() * 1000);
    return _getEnigmaService()
        .then( function( qix ) {
            return qix.global.openApp( appId );
        } )
        .then( function( app ) {
            return getObjectLayout( app, objectId ).then( function( layout ) {
                //Create Snapshot as a Bookmark
                return app.createBookmark( oDefs.bookmark(layout, sheetId) ).then( function( bookmark ) {
                    console.log("Snapshot created, id = " + bookmark.id);
                    //Create Story
                    return app.createObject( oDefs.story(storyName) ).then( function( story ) {
                        console.log("Story created, id = " + story.id);
                        //Create Slide
                        return story.createChild( oDefs.slide() ).then( function( slide ) {
                            console.log("Slide created, id = " + slide.id);
                            //Create SlideItem
                            return slide.createChild( oDefs.slideItem( layout.qInfo.qType, bookmark.id) ).then( function( slideItem ) {
                                console.log("SlideItem created");
                                //Embed snapshot in the SlideItem
                                return slideItem.embedSnapshotObject( bookmark.id ).then( function() {
                                    console.log("Snapshot embedded in SlideItem for Story -> "+storyName);
                                } );
                            } );
                        } );
                    } );
                } );
            } );
        } )
        .catch( function(err) {
            console.log("Error in createSnapshotInNewStory", err);
            process.exit();
        } );
}

//***exports
exports.prepareSelection = prepareSelection;
exports.createSnapshotInNewStory = createSnapshotInNewStory;
