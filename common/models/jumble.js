'use strict';

module.exports = function(Jumble) {
    Jumble.groupingInLanguage = function (jumbleId, langId, cb) {
        console.log(jumbleId);
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
                              "where": {"languageId": langId}
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
            console.log(err);
            console.log(resp);
            console.log('###########');
            cb(null, resp);
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
                    arg: 'languageId',
                    type: 'string',
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
