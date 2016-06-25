import { FlowRouter } from 'meteor/kadira:flow-router'


Accounts.onLogin(function(){
	console.log("entered onLogin")

 if (Meteor.isClient) {
		const
		  route = FlowRouter.current().route.name,
	    didLoginOrSignup = route === "login" || route === "signup" ,
	    loginRedirect = Session.get("loginRedirect"),
	    requestedPage = Session.get("requestedPage")	  

		console.log("loginRedirect: ", loginRedirect)
	  console.log("didLoginOrSignup: ", didLoginOrSignup)
	  console.log("requestedPage: ", requestedPage)

    if(loginRedirect && didLoginOrSignup){
      FlowRouter.go(requestedPage)
      Session.set("loginRedirect", false)
    } else {
    	FlowRouter.go('homepage')
    }
	}

})

// AppLibRedirectPath = null;

// Accounts.onLogin(function(){
// 	  console.log('entered onLogin');
//   if (Meteor.isClient) {
//     if (AppLibRedirectPath != null && AppLibRedirectPath != '/login') {
//       FlowRouter.go(AppLibRedirectPath);
//       AppLibRedirectPath = null;
//     } else {
//        FlowRouter.go('homepage');
//     }; 
//   };
// });