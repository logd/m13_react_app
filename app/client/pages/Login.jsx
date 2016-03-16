import React from 'react'
import {AppHeader} from '../layout/AppHeader.jsx'
import {LoginWithPassword} from '../forms/LoginWithPassword.jsx'

export const Login = (props) => {

  function loginWithGoogle(){
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    },  function(err) {
        if (err) {
         console.log('error: ' + err);
         // throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
      }
   })
    // AppLib.accounts.loginWithGoogle()
  }
  

  const

  loginWithPassword = () => {
    return Meteor.settings.public.loginWithPassword? <LoginWithPassword /> : null;
  }
  ,
  googleLoginLabel = "Sign in via Google"
  ;
  

  return <div className="app-container">
          <AppHeader />
          <main className="main-content layout-centered centered">
            <h2>Please Sign In</h2>
            <p><button onClick={loginWithGoogle} className="btn btn-google btn-with-icon"><i className="fa fa-google-plus"></i>{googleLoginLabel}</button>
            </p>
            {loginWithPassword()}
            <div className="centered secondary-text footer-text login-footer">
             
            </div>
          </main>
        </div>

}

// {
//       requestPermissions: ['email']
//     }, (err) => {
//       if (err) {
//          console.log('error: ' + err.reason);
//          throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
//       }
//    }

 // <FooterLinks />
// List.propTypes = {
//   items: React.PropTypes.array.isRequired,
//   noItemsMsg: React.PropTypes.string,
//   deleteItem: React.PropTypes.bool,
//   handleDeleteItem: React.PropTypes.func
// }

// List.defaultProps = { 
//   deleteItem: false
// }




// Login = React.createClass({

 //  loginWithGoogle() {
    
 //    Meteor.loginWithGoogle({
 //      requestPermissions: ['email']
 //    }, (err) => {
 //      if (err) {
 //         console.log('error: ' + err.reason);
 //         throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
 //      }
 //   });
 //  },
 // loginWithPassword() {
 //   return Meteor.settings.public.loginWithPassword? <LoginWithPassword /> : null;
 //  },
//   render(){
//       const googleLoginLabel = "Sign in via Google";

//       return  (
//         <div className="app-container">
//           <AppHeader />
//           <main className="main-content layout-centered centered">
//             <h2>Please Sign In</h2>
//             <p><button onClick={this.loginWithGoogle} className="btn btn-google btn-with-icon"><i className="fa fa-google-plus"></i>{googleLoginLabel}</button>
//             </p>
//             {this.loginWithPassword()}
//             <div className="centered secondary-text footer-text login-footer">
//               <FooterLinks />
//             </div>
//           </main>
//         </div>
//       )
//     }
// });
