var Express = require('express');
var path = require('path');
var fs = require('fs');
var defaults = require('../config/defaults');

module.exports = function getServer(options) {
  var minerUrl = options.minerUrl || defaults.minerUrl;
  var proxyConfig =
    options.websocketPort != null
      ? `<script>CoinHive.CONFIG.WEBSOCKET_SHARDS = [["ws://localhost:${options.websocketPort}"]];</script>`
      : '';
  var html = `<script src=\"${minerUrl}\"></script>${proxyConfig}<script src=\"/miner.js\" /></script>`;
  var app = new Express();
  app.get('/miner.js', (req, res) => {
    var minerPath = path.resolve(__dirname, './miner.js');
    fs.createReadStream(minerPath).pipe(res.header('content-type', 'application/json'));
  });
  app.use('*', (req, res) => res.send(html));
  return app;
};

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

});
