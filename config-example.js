(function(module) {
  var dynamodb = {
    'accessKeyId': 'akid',
    'secretAccessKey': 'secret',
    'endpoint': 'http://localhost:8000/',
    'region': 'localhost'
  };

  var server = {
    'port': 8001
  }

  module.exports.dynamodb = dynamodb;
  module.exports.server = server;
}(module);
