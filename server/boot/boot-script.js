module.exports = function (app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Language = app.models.Language;

  var Word = app.models.Word;
  var Translation = app.models.Translation;
  var Jumble = app.models.Jumble;
  var JumbleGrouping = app.models.JumbleGrouping;

// Jumble.nestRemoting('grouping');
// JumbleGrouping.nestRemoting('words')
// Word.nestRemoting('translations');

    User.nestRemoting('known');
    User.nestRemoting('unknown');


  // Language.create([
  //     {
  //       code: "en-US",
  //       description: "American English",
  //     },
  //     {
  //       code: "ko",
  //       description: "Korean"
  //     }
  //   ])
  // Language.create([
  //     {
  //       code: "de",
  //       description: "German"
  //     }
  //   ]);

  User.findById(
    '58cdbbe9fb4378a4630ae19b'
  , function(err, users) {
    if (err) return console.log(err);

    // create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) console.log('error1');

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users.id
      }, function(err, principal) {
        console.log('error2');
      });
    });
  });
}