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

    slideItem: function( vizType, snapshotId, position ) {

        position = position || {
            "top": "0",//"25.86%",
            "left": "0",//"29.17%",
            "width": "100%", // "35.42%",
            "height": "100%", //"36.95%",
            "z-index": 4
        };

        return {
            "qInfo": {
                "qType": "slideitem"
            },
            "qEmbeddedSnapshotDef": {},
            "title": "",
            "sheetId": "",
            "ratio": true,
            "position": position,
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
                    "h": 400
                }
            },
            "rtl": false,
            "content": {
                "chartData": {
                    "legendScrollOffset": 0,
                    "scrollOffset": 0,
                    "axisInnerOffset": 0,
                    "hasMiniChart": true,
                    //"discreteSpacing": 28.031456360866315,
                    //"viewRange": 4.95871,
                },
                "size": {
                    "w": 640,
                    "h": 400
                },
                "v": 0.96
            },
            "parent": {
                "w": 1280,
                "h": 800
            }
        };

        if ( objectLayout.qInfo.qType === 'scatterplot' ) {
            bookmark.snapshotData.content.chartData = {
                "xAxisMin": 0,
                "xAxisMax": objectLayout.qHyperCube.qMeasureInfo[0].qMax * (1.1), //length x-axis
                "yAxisMin": 0,
                "yAxisMax": objectLayout.qHyperCube.qMeasureInfo[1].qMax * (1.1) //length y-axis
            }
        }

        delete bookmark.qExtendsId;

        bookmark.qInfo = {
            "qType": "snapshot"
        };

        //console.log(JSON.stringify(bookmark));

        return bookmark;
    }

};
