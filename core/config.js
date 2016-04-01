var path = require('path');
var _ = require('underscore');
var uglify = require('uglify-js');
var vm = require('vm');

module.exports = {
  loaded: false
};

module.exports.load = function () {

  var _main_ = require.main.filename;
  var __cfg_file = path.join ( path.dirname(_main_), 'config.js' );
  var __cfg_raw = undefined;
  var __config = {};

  try {
    __cfg_raw = uglify.minify(__cfg_file).code
  } catch(err) {

    if (err.code == "MODULE_NOT_FOUND") {
      console.log("could not find config.json!")
    } else if (err.code == "EACCES") {
      console.log("could not access config.json!")
    } else {
      console.log("an unknown error occoured!")
    }

    console.log(err);

    return;
  }

  const script = new vm.Script(__cfg_raw);
  script.runInNewContext(__config);

  _.extend(this, __config._);
  this.loaded = true;

};

module.exports.getircClientConfig = function (obj) {

  var __config = {};
  var __defaults = {
    "stripColors": false,
    "autoConnect": true,
    "localAddress": null,
    "debug": false,
    "showErrors": false
  };

  var __obj = obj;
  delete obj["nickserv"];

  _.extend(__config, __defaults);

  _.extend(__config, obj['connection']);
  delete obj["connection"];

  _.extend(__config, __obj);

  return __config
};
