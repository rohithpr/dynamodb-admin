(function(module) {
  var url = require('url')
  var Router = require('i40')
  var router = new Router()

  var utils = require('./utils')
  var static = require('./controllers/static')
  var api = require('./controllers/api')

  router.addRoute('/', static.static)
  router.addRoute('/static/*', static.static)

  router.addRoute('/api/listTables', api.listTables)

  var routes = function(request, response) {
    var path = url.parse(request.url).pathname
    var match = router.match(path)
    if (typeof match === 'undefined') {
      console.log('Not found: ', path)
      utils.send404(response)
    }
    else {
      match.fn(request, response, match)
    }
  }

  module.exports.routes = routes
})(module)
