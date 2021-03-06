var Msg = require("../../models/msg");

module.exports = function(irc, network) {
	var client = this;
	irc.on("invite", function(data) {
		var chan = network.getChannel(data.channel);
		if (typeof chan === "undefined") {
			chan = network.channels[0];
		}

		var msg = new Msg({
			type: Msg.Type.INVITE,
			time: data.time,
			from: data.nick,
			invited: data.invited,
			channel: data.channel,
			highlight: true,
			invitedYou: data.invited === irc.user.nick
		});
		chan.pushMessage(client, msg);
	});
};
