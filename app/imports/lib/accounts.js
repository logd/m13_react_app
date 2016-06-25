const 
  ACCOUNTS_HELPERS = {
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

export { ACCOUNTS_HELPERS }
