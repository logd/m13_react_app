import React from 'react'
import {mount} from 'react-mounter'
import { MainLayout } from '/imports/components/layout/main_layout'
import { Login } from '/imports/components/pages/login'
import { Signup } from '/imports/components/pages/signup'


// //COMPONENTS
// // import Alert from 'react-s-alert'

// //PAGES
// import {About} from './pages/About'
// import Homepage from './pages/Homepage'
// import NoteDetail from './pages/NoteDetail'
// import {NotFound} from './pages/NotFound'


// ------------------------
// TRIGGERS/HOOKS
// ------------------------
function redirectIfAnonymous(context, redirect) {
  if(!Meteor.userId() || Meteor.loggingIn()){
    console.log("context path: ", context.path)
    Session.set("loginRedirect", true)
    Session.set("requestedPage", context.path)
    redirect('login')
  }
}

// function alreadySignedInRedirect() {
//   if(Session.get("alreadySignedInRedirect")){
//     Alert.info("Please sign out before signing in/up", {effect: 'stackslide', position: 'top', timeout: 2500,})
//     Session.set("alreadySignedInRedirect", false)
//   }
// }

// function redirectIfSignedIn(context, redirect) {
//   if (Meteor.userId()) {
//     redirect('homepage')
//     // Alert.info("Please sign out before signing in/up", {effect: 'stackslide', position: 'top', timeout: 2500,})
//     // Session.set("alreadySignedInRedirect", true)
//   }
// }


const Homepage = () =>  <div>Homepage</div>



// ------------------------
// Accounts
// ------------------------

FlowRouter.route('/login', {
  name: 'login',
  // triggersEnter: [redirectIfSignedIn],
  action() {
    mount(MainLayout, {
      page: () => <Login />
    })
  }
})

FlowRouter.route('/signup', {
  name: 'signup',
  // triggersEnter: [redirectIfSignedIn],
  action() {
    mount(MainLayout, {
      page: () => <Signup />
    })
  }
})

FlowRouter.route('/logout', {
  name: 'logout',
  action: function() {
    Meteor.logout(function(){
      FlowRouter.go('login')
      // Alert.info("You've been signed out.", {effect: 'stackslide', position: 'top', timeout: 2000,})
      // FlowRouter.go('login');
    })
  }
})



// ------------------------
// RESTRICTED Routes
// ------------------------
const restrictedRoutes = FlowRouter.group({
  name: 'restricted',
  triggersEnter: [redirectIfAnonymous]
})

restrictedRoutes.route('/', {
  name: 'homepage',
  action() {
    mount(MainLayout, {
      content: () => <Homepage />
    })
  }
})

// FlowRouter.route('/', {
//   name: 'logout',
//   action(){
//     mount(MainLayout, {
//       page: () => <Homepage />
//     })
//   }
// })


// restrictedRoutes.route('/notes/:_id', {
//   name: 'noteDetail',
//   action(params) {
//     mount(MainLayout, {
//       content: () => <NoteDetail _id={params._id} />
//     })
//   }
// })


// ------------------------
// Public Routes
// ------------------------
// FlowRouter.route('/about', {
//   name: 'about',
//   action() {
//     mount(MainLayout, {
//       content: () => <AboutPage />
//     })
//   }
// })

// ------------------------
// NOT FOUND / 404
// ------------------------

// FlowRouter.notFound = {
//   action() {
//     mount(MainLayout, {
//       content: () => <NotFound />
//     });
//   }
// }
