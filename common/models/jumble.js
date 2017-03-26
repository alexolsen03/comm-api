'use strict';

module.exports = function(Jumble) {
    Jumble.groupingInLanguage = function (jumbleId, langIds, cb) {
        Jumble.find({
            "include": {
                "relation": "grouping",
                "scope": {
                    "include": {
                        "relation": "word",
                        "scope": {
                          "include": {
                            "relation": "translations",
                            "scope": {
                              "where": {"languageId": { inq: langIds} }
                            }
                          }
                        }
                    }
                }
            },
            "where": {
                "_id": jumbleId
            },
        }, function (err, resp) {

            var nativeLanguage = [];
            var unknownLanguage = [];

            resp.forEach(function(r) {
                r.grouping().forEach(function (grouping) {
                    grouping.word().translations().forEach(function (translation) {
                        if (translation.languageId.toString() === langIds[0].toString()) {
                            nativeLanguage.push(translation);
                        } else {
                            unknownLanguage.push(translation);
                        }
                    })
                });
            });

            var obj = {
                nativeLanguage: nativeLanguage,
                unknownLanguage: unknownLanguage
            }

            cb(null, obj);
        })
    };

    Jumble.remoteMethod(
        'groupingInLanguage',
        {
          accepts: [{
                arg: 'jumbleId',
                type: 'string',
                required: true
              },
                {
                    arg: 'languageIds',
                    type: 'array',
                    required: true
                }
          ],
          returns: {
            arg: 'translations',
            type: 'array'
          },
          http: { verb: 'get' }
        }
    )
};
