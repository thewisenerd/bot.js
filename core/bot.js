var irc = require('irc');
var config = require('./config');
var events = require('./events');

module.exports.init = function(__config) {
  this.config = __config;

  this.bots = [];
  this.events = {};

  events.init(this.events, __config.data);

  for (var conn of config.connections) {
    conninit(conn);
  }

};

var conninit = function(conndata) {

  var __config = config.getircClientConfig(conndata);
  var __bot = getbot(conndata, __config);
  module.exports.bots.push ( __bot );

  events.addlisteners( this.events, __bot.irc )

};

var getbot = function(conndata, config) {

  var bot = {};
  bot.conndata = conndata;
  bot.irc = new irc.Client(config['nick'], config['server'], config);
  return bot;

};
