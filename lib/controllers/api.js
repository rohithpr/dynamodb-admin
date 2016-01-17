(function(module) {
  var aws = require('aws-sdk')
  var config = require('../../config')
  var utils = require('../utils')

  for (i in config.dynamodb) {
    aws.config[i] = config.dynamodb[i]
  }
  var db = new aws.DynamoDB()

  var listTables = function(request, response) {
    db.listTables({}, function(err, data) {
      console.log(err, data)
      utils.sendJson(response, JSON.stringify(data))
    })
  }

  module.exports.listTables = listTables
})(module)
