Accounts.onCreateUser(function(options,user){
	user.profile = options.profile ? options.profile : {};
	user.profile.mainEmail = AppLib.accounts.setProfileMainEmail(user, options);
	user.profile.fullName = AppLib.accounts.setProfileFullName(user);
	user.profile.firstName = AppLib.accounts.setProfileFirstName(user);
	user.profile.profileImage = AppLib.accounts.setProfileImage(user);
	return user;
});