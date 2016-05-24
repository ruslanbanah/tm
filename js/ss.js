var api = GeotabApi(function(authenticateCallback) {
        // We need credentials; we either never had them, or lost them (the server was moved, password
        // changed, etc.)
        authenticateCallback('https://my.geotab.com','', 'vsingh@zenduit.com', '18889981122##', function(errorString) {
              alert(errorString);
          });
    });

var apiKey,
    sesionId,
    logonParams = {
      username: 'vsingh@zenduit.com',
      password: '18889981122##'
    };
myAdminApi().call('Authenticate', logonParams, function(user) {
  apiKey = user.userId;
  sessionId = user.sessionId;
  console.log(user);
});

api.call('AddGps', {
}, function (result) {
  alert(result);
}, function (error) {
  console.log(error);
});
