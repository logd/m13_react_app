Meteor.startup(function(){
	Session.setDefault({
		"loginRedirect": false,
		"requestedPage": null
	})
})