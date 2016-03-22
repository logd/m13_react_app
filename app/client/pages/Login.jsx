import React from 'react'
import {AppHeader} from '../layout/AppHeader.jsx'
import {LoginWithPassword} from '../forms/LoginWithPassword.jsx'

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
    googleLoginLabel = "Sign in via Google"
  

  return <div className="app-container">
          <AppHeader />
          <main className="main-content centered">
            <h2>Please Sign In</h2>
            <p><button onClick={loginWithGoogle} className="btn btn-google btn-with-icon"><i className="fa fa-google-plus"></i>{googleLoginLabel}</button>
            </p>
            {loginWithPassword()}
          </main>
        </div>
}