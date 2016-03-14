import React from 'react'

LoginWithPassword = React.createClass({
  loginWithPassword: function(e) {
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();
    
    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'stackslide', position: 'top'});
      } else {
        FlowRouter.go('/');
      }
    });
  },

  render(){
      return  (
       <form onSubmit={this.loginWithPassword} id="login-form">
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
});
