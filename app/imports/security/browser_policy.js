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