import React from 'react'
import { AppHeader }          from '/imports/ui/layouts/app_header'
import { AppFooter }          from '/imports/ui/layouts/app_footer'
import { LoginWithPassword }  from '/imports/ui/forms/login_with_password'

export const Login = (props) => {

  const

    loginWithGoogle = () => {
      Meteor.loginWithGoogle({
        requestPermissions: ['email']
      }, (err) => {
        if (err) {
         console.log('error: ' + err);
        }
     })
    }
    ,
    loginWithPassword = () => {
      return Meteor.settings.public.loginWithPassword?
        <LoginWithPassword />
      : 
        null
    }
    ,
    googleLoginLabel = "Sign in via Google",

    routeName = FlowRouter.getRouteName();
 

  return <div className="app-container">
          <AppHeader />
          <div className="main-content centered">
            <h2>Please Sign In</h2>
            <p><button onClick={loginWithGoogle} className="btn btn-google btn-with-icon"><i className="fa fa-google-plus"></i>{googleLoginLabel}</button>
            </p>
            {loginWithPassword()}
            <AppFooter routeName={routeName} />
          </div>
        </div>
}