import React from 'react'

export const Signup = (props) => {

	const createAccount = (e) => {
	  e.preventDefault()
	  
	  Accounts.createUser({
	      email: e.target.email.value,
	      password: e.target.password.value
	    }, (error) => {
	      if (error) {
	      	console.log("there was an error: " + error.reason)
	        // sAlert.error(error.reason, {effect: 'stackslide', position: 'bottom'})
	      } else {
	        FlowRouter.go('homepage')
	      }
	    })
	}

	return (
	  <div className="col-xs-12 col-sm-6">
	    <h1>Sign Up</h1>
	    <form id="register-form" action="#" onSubmit={createAccount}>
	      <div className="form-group">
	        <label htmlFor="email">Email:</label>
	        <input type="email" id="email" name="email" className="form-control"/>
	      </div>
	      <div className="form-group">
	        <label htmlFor="password">Password:</label>
	        <input type="password" id="password" name="password" className="form-control"/>
	      </div>
	      <div className="form-group">
	        <button type="submit" className="btn btn-primary">Sign Up</button>
	      </div>
	    </form>
	  </div>
	)
}
