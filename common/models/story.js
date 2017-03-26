'use strict';

module.exports = function(Story) {
    var LIKES = 'L',
          DISLIKES = 'D';

    Story.storyFeed = function (languageId, cb) {
        Story.find({
            "include": [{
                "relation": "jumble",
                "scope": {
                    "include": {
                        "relation": "grouping",
                        "scope": {
                            "include": {
                                "relation": "word",
                                "scope": {
                                  "include": {
                                    "relation": "translations",
                                    "scope": {
                                      "where": {"languageId": languageId }
                                    }
                                  }
                                }
                            }
                        }
                    }
                }
            },
            {
                "relation": "reactions"
            }],
            "where": { "languageId": languageId }
        },
        function (err, resp) {
            var transformedRows = [];
            var likeCt = 0;
            var dislikeCt = 0;

            resp.forEach(function(row) {
                var words = [];

                row.jumble().grouping().forEach(function(group) {
                    words.push(group.word().translations()[0]);
                });

                row.reactions().forEach(function(reaction) {
                    if (reaction.reaction === LIKES) {
                        likeCt++;
                    } else {
                        dislikeCt++;
                    }
                });

                console.log(row);

                var obj = {
                    languageId: row.languageId,
                    id: row.id,
                    jumbleId: row.jumbleId,
                    body: row.body,
                    title: row.title,
                    words: words,
                    likes: likeCt,
                    dislikes: dislikeCt,
                    difference: (likeCt - dislikeCt)
                }

                transformedRows.push(obj);
            })

            cb(null, transformedRows);
        })
    };

    Story.remoteMethod(
        'storyFeed',
        {
          accepts: [{
                arg: 'languageId',
                type: 'string',
                required: true
              }
          ],
          returns: {
            arg: 'stories',
            type: 'array'
          },
          http: { verb: 'get' }
        }
    );
};
