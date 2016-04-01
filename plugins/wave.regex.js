module.exports = {
  "match": [/^waves$/],
  "events": ["action"],
  "admin": false
};

module.exports.callback = function(bot, match, from, to, text, message) {
  bot.action(to, "waves back");
};
