AppLib = {}

AppLib.appInfo = {
  title: "Logd"
}

AppLib.str = {

  getFirstLine: (str) => str.split("\n")[0].trim(),

  isEmpty: (str) => (str.length === 0 || !str.trim())
}

AppLib.forms = {
  shiftReturn: (e) => (e.which === 13 && e.shiftKey)
}

AppLib.lists = {
  lockItemCount: (totalQty, displayedQty) => {
    return totalQty <= displayedQty? totalQty : displayedQty
  }
}

AppLib.notes = {
  title: {
    maxLength: 100
  },
  content: {
    maxLength: 25000
  }
}


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
    )
  }
}

// AppLib.users = {
//   firstName: () => {


//   }
// }

AppLib.accounts = {
  setProfileMainEmail: (user, options) => {
    if (options.email) {
      return options.email
    } else if(user.services.google){
      return user.services.google.email
    } else {
      throw new Error('No email found')
      return null
    }
  }
  ,
  setProfileFullName: (user) => user.services.google? user.services.google.name: user.profile.mainEmail
  ,
  setProfileFirstName: (user) => (user.services.google && user.services.google.given_name)? user.services.google.given_name : null
  ,
  setProfileImage: (user) => {
    if(user.services.google){
      return user.services.google.picture
    } else if (user.profile.mainEmail) {
      return Gravatar.imageUrl(Email.normalize(user.profile.mainEmail), {secure: true })
    } else {
      throw new Error('No image found')
      return null
    }
  }
}