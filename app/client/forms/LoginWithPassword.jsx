import React from 'react'

export const LoginWithPassword = (props) => {

  const loginWithPassword = (e) => {
    e.preventDefault()
    
    const
      email = $('#email').val(),
      password = $('#password').val()
    
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log("login error: " + error.reason)
        sAlert.error(error.reason, {effect: 'stackslide', position: 'top'})
      } else {
        FlowRouter.go('homepage')
      }
    })
  }

  return  (
    <form onSubmit={loginWithPassword} id="login-form">
      <div className="form-group">
       <label htmlFor="email">Email:</label>
       <input type="email" id="email" name="email" className="form-control"/>
     </div>
     <div className="form-group">
       <label htmlFor="password">Password:</label>
       <input type="password" id="password" name="password" className="form-control"/>
     </div>
     <div className="form-group">
       <button type="submit" className="btn btn-primary">Sign In</button>
     </div>
      <div className="form-group">
        <a href="/signup" className="signup-link">Sign Up</a>
      </div>
    </form>
  )
}
