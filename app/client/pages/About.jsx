import React from 'react'
import {AppHeader} from '../layout/AppHeader.jsx'
import {PageTitle} from '../content/PageTitle.jsx'
import {AppFooter} from '../layout/AppFooter.jsx'

export const About = () => {

	const 
	  pagetitle = () => <PageTitle pageTitle="About" />,

    pageContent = <section><p>Logd is a simple app for creating notes, designed and developed by <a href="http://andersramsay.com/">Anders Ramsay</a>.</p> <p><a href="http://www.google.com/recaptcha/mailhide/d?k=01rjxPtv-5M2bSrszeGK61Eg==&c=-jgul08jNZgfymfgqW7dlQ==">Contact Anders</a>.</p> <p><a href="https://github.com/logd/m13_react_app">Github repo</a>.</p></section>

    return <div className="app-container">
        <AppHeader headerCenter={pagetitle()} />
        <div className="main-content">
          {pageContent}
        </div>
         <AppFooter/>
      </div>
}




    // backBtn = <ActionBtn
    //           btnAction={this.handleBackBtn}
    //           btnTitle="Go Back" 
    //           btnIcon="arrow_back" />

// export default AboutPage

// AboutPage = React.createClass({
//   mixins: [ReactMeteorData],
//   getMeteorData() {
//     let currentUser;
//     const
//       subscriptions = [
//         Meteor.subscribe("userData")
//       ],
//       subsReady = _.all(subscriptions, function (sub) { return sub.ready(); })
//     ;

//     if(Meteor.userId()){
//       if (subsReady) { currentUser = Meteor.user(); };
//     };
  
//     return {
//       subsReady: subsReady || null,
//       currentUser: currentUser || null
//     }
//   },
//   handleBackBtn: function(){
//     history.back();
//   },
//   showUserNav: function(){
//     if(Meteor.userId()){
//       if (this.data.subsReady) {
//         return <OptionsMenu userName={this.data.currentUser.profile.fullName} />;
//       } else {
//         return null;
//       };
//     } else {
//       return null;
//     }
//   },
//   render: function() {
//     const pageTitle = <PageTitle pageTitle= "About Logd" />;
//     const pageContent = <section><p>Logd is a simple app for creating notes, designed and developed by <a href="https://twitter.com/andersramsay">@andersramsay</a>.</p> <p>Contact me: <a href="http://www.google.com/recaptcha/mailhide/d?k=01TFRfGssWj-3PuYFClMj9sA==&c=2R2mS2abKy2gGIx8plwwQg==">View email address</a>.</p> <p><a href="https://github.com/logd/meteor_react_app">Github repo</a>.</p></section>;
//     const backBtn = <ActionBtn
//               btnAction={this.handleBackBtn}
//               btnTitle="Go Back" 
//               btnIcon="arrow_back" />;
    
//     return (
//       <div className="app-container">
//         <AppHeader headerLeft={backBtn} headerCenter={pageTitle} headerRight={this.showUserNav()} />
//         <main className="main-content layout-centered">
//           {pageContent}
//         </main>
//       </div>
//     )
//   }         
// });


