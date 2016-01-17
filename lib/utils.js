(function(module) {
  var mime = require('mime')
  var path = require('path')
  var fs = require('fs')
  var cache = {}

  var send404 = function(response) {
    response.writeHead(404, {
      'Content-Type': 'text/html',
      'Content-Length': '0',
    })
    response.end()
  }

  var sendJson = function(response, content) {
    var headers = {
      'Content-Type': 'application/json',
      'Content-Length': content.length,
    }
    response.writeHead(200, headers);
    response.end(content);
  }

  var serveStatic = function(response, absPath) {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response)
          }
          else {
            cache[absPath] = data
            sendFile(response, absPath, data)
          }
        })
      }
      else {
        send404(response)
      }
    })
  }

  // var serveStatic = function(response, absPath) {
  //   if (cache[absPath]) {
  //     sendFile(response, absPath, cache[absPath])
  //   }
  //   else {
  //     fs.exists(absPath, function(exists) {
  //       if (exists) {
  //         fs.readFile(absPath, function(err, data) {
  //           if (err) {
  //             send404(response)
  //           }
  //           else {
  //             cache[absPath] = data
  //             sendFile(response, absPath, data)
  //           }
  //         })
  //       }
  //       else {
  //         send404(response)
  //       }
  //     })
  //   }
  // }

  var sendFile = function(response, filePath, fileContents) {
    response.writeHead(200, {
      "content-type": mime.lookup(path.basename(filePath))
    })
    response.end(fileContents)
  }

  module.exports.send404 = send404
  module.exports.sendJson = sendJson
  module.exports.serveStatic = serveStatic
})(module)
