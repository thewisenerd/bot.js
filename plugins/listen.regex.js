module.exports = {
  "match": [ /is listening to (.+)$/ ],
  "events": ["action"],
  "admin": false
};

module.exports.callback = function(bot, match, from, to, text, message) {
  bot.say(to, from + ", " + match[1] + " is awesome!");
};
