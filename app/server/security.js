import { Notes } from '/imports/collections/notes'

// --------------------------------------------------------------
// Deny all client-side updates to user documents
// http://guide.meteor.com/accounts.html#dont-use-profile
// --------------------------------------------------------------
Meteor.users.deny({
  update: function() {
    return true
  }
})

// --------------------------------------------------------------
// BROWSER POLICY 
// https://atmospherejs.com/meteor/browser-policy
// --------------------------------------------------------------
const trusted = [
  '*.google-analytics.com',
  '*.googleapis.com',
  '*.gstatic.com',
  '*.googleusercontent.com',
  'graph.facebook.com',
  '*.fbcdn.net',
  'secure.gravatar.com',
  'i0.wp.com',
  '*.typekit.net',
  'cloud.githubusercontent.com'
]

_.each(trusted, (origin) => BrowserPolicy.content.allowOriginForAll(origin))

BrowserPolicy.content.allowInlineStyles()
BrowserPolicy.content.allowFontDataUrl()


if (process.env.NODE_ENV === 'development') {
    BrowserPolicy.content.allowOriginForAll("localhost:*")
    BrowserPolicy.content.allowConnectOrigin("ws://localhost:5000")
    BrowserPolicy.content.allowConnectOrigin("http://localhost:5000")
    BrowserPolicy.framing.allowAll()
} else {

  BrowserPolicy.framing.disallow()
  // BrowserPolicy.content.disallowInlineScripts()
  BrowserPolicy.content.disallowEval()
}

// --------------------------------------------------------------
// DB Policies
// Uses https://github.com/ongoworks/meteor-security/
// --------------------------------------------------------------
Security.defineMethod("ifIsOwner", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.ownerId;
  }
})

//Must be signed in to create a note 
Notes.permit('insert').ifLoggedIn().apply()

//Must be the owner to update or remove a note 
Notes.permit(['update', 'remove']).ifIsOwner().apply()