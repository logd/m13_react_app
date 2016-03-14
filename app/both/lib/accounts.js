AppLibRedirectPath = null;

Accounts.onLogin(function(){
  // console.log('entered onLogin');
  if (Meteor.isClient) {
    if (AppLibRedirectPath != null && AppLibRedirectPath != '/login') {
      FlowRouter.go(AppLibRedirectPath);
      AppLibRedirectPath = null;
    } else {
       FlowRouter.go('homepage');
    }; 
  };
});