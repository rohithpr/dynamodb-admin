(function(module) {
  var utils = require('../utils')
  var static = function(request, response, match) {
    if (match.route === '/') {
      utils.serveStatic(response, 'static/html/index.html')
    }
    else {
      utils.serveStatic(response, 'static/' + match.splats[0])
    }
  }
  module.exports.static = static
})(module)
