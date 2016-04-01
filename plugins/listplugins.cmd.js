var fs = require('fs');
var path = require('path');

module.exports = {
  "match": ["listplugins"],
  "events": ["message"],
  "admin": false
};

module.exports.callback = function(bot, match, from, to, text, message) {

  var _main_ = path.dirname(require.main.filename);
  var _plugins_ = path.join ( _main_, 'plugins' );

  fs.readdir(_plugins_, createCB(bot, from, to, text));

};

function createCB(bot, from, to, text) {
  return function(err, data) {

    var filelist = 'files in plugin dir: ';

    for (var file of data) {
      filelist += file;
      if (data.indexOf(file) == (data.length - 2)) {
          filelist += ' and ';
      } else {
        if (data.indexOf(file) == (data.length - 1)) {
          filelist += '.';
        } else {
          filelist += ', '
        }
      }
    }

    bot.say(to, filelist);

  } // fn(err, data)
} // create CB
