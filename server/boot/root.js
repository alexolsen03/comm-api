module.exports = function(server) {
  // Install a `/` route that returns server status
  console.log('in root');
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
