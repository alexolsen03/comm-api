module.exports = function (app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.findById(
    '58cdbbe9fb4378a4630ae19b'
  , function(err, users) {
    if (err) return console.log(err);

    console.log(users);

    // create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) console.log('error1');

      console.log('role is ', role);
      console.log('userid ', users.id);

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