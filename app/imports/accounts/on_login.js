import { Accounts } from 'meteor/accounts-base'

Accounts.onLogin(function(){
	console.log("entered onLogin")

 if (Meteor.isClient) {
		const
		  route = FlowRouter.current().route.name,
	    didLoginOrSignup = route === "login" || route === "signup"

	   if(Session.get("loginRedirect")){
	   	Session.set("loginRedirect", false)
      FlowRouter.go(Session.get("requestedPage"))
    } else if (didLoginOrSignup) {
    	FlowRouter.go('homepage')
    }
	}
})
