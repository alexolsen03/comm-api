'use strict';

module.exports = function(Jumblegrouping) {

    // Jumblegrouping.jumble = function(jumbleId, cb) {

    //     console.log(Jumblegrouping.find({}));

    //     var response = Jumblegrouping.find({where: {jumbleId: jumbleId} } ); // include translations

    //     console.log('############');
    //     console.log(response);
    //     console.log('############');

    //     cb(null, response);
    // };

    Jumblegrouping.jumble = function (jumbleId, cb) {
        Jumblegrouping.find({where: {jumbleId: ObjectId(jumbleId)}}, function (err, jumble) {
            console.log(err);
            console.log('###########');
            console.log(jumble);
            console.log('###########');
            cb(null, jumble);
        });
    }

    Jumblegrouping.remoteMethod(
        'jumble', {
          accepts: {
            arg: 'jumbleId',
            type: 'string',
            required: true
          },
          returns: {
            arg: 'translations',
            type: 'array'
          }
        }
    );

};
