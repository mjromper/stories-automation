_ = require('underscore');

module.exports = {

    story: function( name ) {
        return {
            "qInfo": {
                "qType": "story"
            },
            "qMetaDef": {
                "title": name,
                "description": "",
            },
            "rank": "1",
            "thumbnail": {
                "qStaticContentUrlDef": null
            },
            "qChildListDef": {
                "qData": {
                    "title": "/title",
                    "rank": "/rank"
                }
            }
        };
    },

    slide: function() {
        return {
            "qInfo": {
                "qType": "slide"
            },
            "rank": 1,
            "qChildListDef": {
                "qData": {
                    "title": "/title",
                    "sheetId": "/sheetId",
                    "ratio": "/ratio",
                    "position": "/position",
                    "dataPath": "/dataPath",
                    "srcPath": "/srcPath",
                    "visualization": "/visualization",
                    "visualizationType": "/visualizationType",
                    "style": "/style"
                }
            }
        };
    },

    slideItem: function( vizType, snapshotId ) {
        return {
            "qInfo": {
                "qType": "slideitem"
            },
            "qEmbeddedSnapshotDef": {},
            "title": "",
            "sheetId": "",
            "ratio": true,
            "position": {
                "top": "25.86%",
                "left": "29.17%",
                "width": "35.42%",
                "height": "36.95%",
                "z-index": 4
            },
            "visualization": "snapshot",
            "visualizationType": vizType,
            "style": {
                "id": snapshotId
            }
        };
    },

    bookmark: function( objectLayout, sheetId ) {

        var bookmark = _.extend({
            "qMetaDef": {
                "title": objectLayout.title,
                "description": "",
                "annotation": "Snapshot by API"
            },
            "creationDate": new Date().toISOString(),
            "visualizationType": objectLayout.qInfo.qType,
            "sourceObjectId": objectLayout.qInfo.qId,
            "sheetId": sheetId,
            "timestamp": Date.now(),
            "isClone": false
        }, objectLayout);

        bookmark.snapshotData = {
            "object": {
                "size": {
                    "w": 640,
                    "h": 320
                }
            },
            "content": {
                "chartData": {
                    "legendScrollOffset": 0,
                    "scrollOffset": 0,
                    "discreteSpacing": 28.031456360866315,
                    "axisInnerOffset": 0,
                    "hasMiniChart": true,
                    "viewRange": 4.95871
                },
                "size": {
                    "w": 640,
                    "h": 320
                },
                "v": 0.96
            },
            "rtl": false,
            "parent": {
                "w": 1028,
                "h": 800
            }
        };

        delete bookmark.qExtendsId;

        bookmark.qInfo = {
            "qType": "snapshot"
        };

        return bookmark;
    }

};
