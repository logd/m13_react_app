import { ACCOUNTS_HELPERS } from '/imports/lib/accounts'

Accounts.onCreateUser(function(options,user){
	user.profile = options.profile ? options.profile : {};
	user.profile.mainEmail = ACCOUNTS_HELPERS.setProfileMainEmail(user, options);
	user.profile.fullName = ACCOUNTS_HELPERS.setProfileFullName(user);
	user.profile.firstName = ACCOUNTS_HELPERS.setProfileFirstName(user);
	user.profile.profileImage = ACCOUNTS_HELPERS.setProfileImage(user);
	return user;
});