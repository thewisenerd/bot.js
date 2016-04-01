var fs = require('fs');
var path = require('path');
var vm = require('vm');

module.exports.load = function(bot) {
  this.commands = [];
  this.regex = [];

  var _main_ = path.dirname(require.main.filename);
  var _plugins_ = path.join ( _main_, 'plugins' );

  // TODO: add support for help for plugins
  // TODO: this is SLOOOW. try doing it async in future.

  // promises?
  try {
    fs.readdirSync(_plugins_).forEach( function (file) {
      var ret = read_cmd_from_file(bot, path.join ( _plugins_, file ));
      if (ret == false)
        console.log("unable to load plugin: " + file)
    });
  } catch (e) {
    console.log(e);
    console.error("unable to load plugins")
  }
};

function read_cmd_from_file(bot, file) {
  try {
    var __plugin = require(file);

     if (__plugin["events"] == undefined)
      return false;

    //console.log(__plugin);

    // add filename to __plugin for later use
    __plugin["file"] = file;

    // set __plugin["count"] for later use
    __plugin["count"] = 0;

    for (var action of __plugin["events"]) {
      bot.events[action].push(__plugin);
    }

    //bot.events.message.push(__plugin);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports.watch = function() {

};
