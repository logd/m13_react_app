Meteor.startup(function () {
	 AppLib.config.createLoginService(
	 	'google',
	 	Meteor.settings.google.client_id,
	 	Meteor.settings.google.client_secret
	);
});