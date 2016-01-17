(function() {
  var http = require('http')
  var config = require('./config')
  var routes = require('./lib/routes').routes
  http.createServer(routes).listen(config.server.port)
})()
