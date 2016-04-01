var config = require('./core/config');

var bot = require('./core/bot');
var plugins = require('./core/plugins');

// load config from config.js
config.load();
if (config.loaded == false) {
  return;
}

// init controller
bot.init(config);

// init plugins
plugins.load(bot);

// watch plugins for changes
plugins.watch();
