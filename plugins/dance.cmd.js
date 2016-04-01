module.exports = {
  "match": ["dance"],
  "events": ["message", "action"],
  "admin": false
};

module.exports.callback = function(bot, match, from, to, text, message) {
  console.log("from: " +from);
  console.log("to: " + to);

  bot.say(to, from + ", did you say dance?");
};
