AppLib = {};

AppLib.appInfo = {
  title: "Logd",
  titleWithTagLine: "Logd - Just Notes"
};

AppLib.auth = {

  isNotAuthenticated(msg = 'Please sign in to continue' ){
    if(!Meteor.userId()){
      alert(msg);
      return true;
    };
    return false;
  }
};

AppLib.str = {
  getFirstLine(str){
    return str.split("\n")[0].trim();
  },
  isEmpty(str){
    return (str.length === 0 || !str.trim());
  }
};

AppLib.forms = {
  shiftReturn(e){
    return (e.which === 13 && e.shiftKey);
  }
};

AppLib.lists = {
  lockItemCount(totalQty, displayedQty) {
    return totalQty <= displayedQty? totalQty : displayedQty;
  }
};

AppLib.notes = {
  title: {
    maxLength: 100
  },
  content: {
    maxLength: 25000
  }
};

AppLib.config = {
  createLoginService(service, clientId, secret, loginStyle = "popup"){
    ServiceConfiguration.configurations.remove({ service: service });

    ServiceConfiguration.configurations.upsert(
      { service:  service },
      { $set: {
          clientId: clientId,
          secret:   secret,
          loginStyle: loginStyle
        }
      }
    );
  }
};

AppLib.accounts = {
  loginWithGoogle(){
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, (err) => {
      if (err) {
         console.log('error: ' + err.reason);
         throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
      }
   });
  },
  setProfileMainEmail(user, options){
    if (options.email) {
      return options.email;
    } else if(user.services.google){
      return user.services.google.email;
    } else {
      throw new Error('No email found');
      return null;
    };
  },
  setProfileFullName(user){
    if(user.services.google){
      return user.services.google.name;
    } else {
      return user.profile.mainEmail;
    };
  },
  setProfileFirstName(user){
    if(user.services.google && user.services.google.given_name ){
      return user.services.google.given_name;
    } else {
      return null;
    };
  },
  setProfileImage(user){
    if(user.services.google){
      return user.services.google.picture;
    } else if (user.profile.mainEmail) {
      return Gravatar.imageUrl(Email.normalize(user.profile.mainEmail), {secure: true });
    } else {
      throw new Error('No image found');
      return null;
    };
  }
};