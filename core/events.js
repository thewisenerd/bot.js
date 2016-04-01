module.exports.init = function(irc, data) {
  irc.join = [];
  irc.part = [];
  irc.kick = [];
  irc.message = [];
  irc.regex = [];
  irc.pm = [];
  irc.invite = [];
  irc.action = [];
  irc.data = data;
  module.exports.irc = irc;
};

module.exports.addlisteners = function(irc, bot) {

  bot.addListener('registered', function(message) {
    console.log('registered: %s', message.args.join(' '));
  });

  bot.addListener('motd', function(motd) {
    console.log('got motd');
    // console.log(motd);
  });

  bot.addListener('error', function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  });

  bot.addListener('message', function(from, to, text, message) {

    console.log('%s : %s : %s', from, to, text);

    var irc = module.exports.irc;

    if (irc.message.length == 0)
      return;

    var re = new RegExp("(?:" + this.nick + "[,\\:\\.]\\W+|[\\.])([a-zA-Z][a-zA-Z0-9-_]*).*");
    var m = re.exec(text);
    console.log(m);

    for (var fn of irc.message) {
      for (var match of fn.match) {
        if (typeof match == "string") {
          if (m != null) {
            if (m[1] == match) {
              //FIXME: do not send 'this' check if fn.admin is required
              fn.callback(this, match, from, to, text, message);
            }
          } // m != null
        } // typeof == string
        else if (typeof match == "object") {
          // TODO: allow regex substitution, eg: /hello {nick}/
          if (match instanceof RegExp) {
            var testRegex = match.exec(text);
            if (testRegex !== null) {
              //FIXME: do not send 'this' check if fn.admin is required
              fn.callback(this, testRegex, from, to, text, message);
            } // mactch.exec !== null
          } // if regexp
        } // typeof == object
      } // var fn of match
    } // fn of irc.message

  });

  bot.addListener('pm', function(nick, message) {
    console.log('Got private message from %s: %s', nick, message);
  });

  bot.addListener('join', function(channel, who) {
    console.log('%s has joined %s', who, channel);
  });

  bot.addListener('part', function(channel, who, reason) {
    console.log('%s has left %s: %s', who, channel, reason);
  });

  bot.addListener('kick', function(channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
  });

  bot.addListener('action', function(from, to, text, message) {

    console.log('%s : %s : %s', from, to, text);

    var irc = module.exports.irc;

    if (irc.action.length == 0)
      return;

    console.log(text);

    // TODO: actions should support "commands" ?

    for (var fn of irc.action) {
      for (var match of fn.match) {
        if (typeof match == "object") {
          // TODO: allow regex substitution, eg: /hello {nick}/
          if (match instanceof RegExp) {
            var testRegex = match.exec(text)
            if (testRegex !== null) {
              // FIXME: do not send 'this' check if fn.admin is required
              // FIXME: should i sending from + ' ' + text?
              fn.callback(this, testRegex, from, to, text, message);
            } // mactch.exec !== null
          } // if regexp
        } // typeof == object
      } // var fn of match
    } // fn of irc.message

  });

};
