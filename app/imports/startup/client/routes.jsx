import React from 'react'
import { mount } from 'react-mounter'

//COMPONENTS
import { MainLayout } from '/imports/ui/layouts/main_layout'
import Alert from 'react-s-alert'
import { About } from '/imports/ui/pages/about'
import Homepage from '/imports/ui/pages/Homepage'
import NoteDetail from '/imports/ui/pages/NoteDetail'
import { Login } from '/imports/ui/pages/Login'
import {Signup} from '/imports/ui/pages/Signup'
import {NotFound} from '/imports/ui/pages/NotFound'


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

function redirectIfSignedIn(context, redirect) {
  if (Meteor.userId()) {
    redirect('homepage')
    // Alert.info("Please sign out before signing in/up", {effect: 'stackslide', position: 'top', timeout: 2500,})
    // Session.set("alreadySignedInRedirect", true)
  }
}


// ------------------------
// Accounts
// ------------------------

FlowRouter.route('/login', {
  name: 'login',
  triggersEnter: [redirectIfSignedIn],
  action() {
    mount(MainLayout, {
      content: () => <Login />
    })
  }
})

FlowRouter.route('/signup', {
  name: 'signup',
  triggersEnter: [redirectIfSignedIn],
  action() {
    mount(MainLayout, {
      content: () => <Signup />
    })
  }
})

FlowRouter.route('/logout', {
  name: 'logout',
  action: function() {
    Meteor.logout(function(){
      FlowRouter.go('login')
      Alert.info("You've been signed out.", {effect: 'stackslide', position: 'top', timeout: 2000,})
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

restrictedRoutes.route('/notes/:_id', {
  name: 'noteDetail',
  action(params) {
    mount(MainLayout, {
      content: () => <NoteDetail _id={params._id} />
    })
  }
})


// ------------------------
// Public Routes
// ------------------------
FlowRouter.route('/about', {
  name: 'about',
  action() {
    mount(MainLayout, {
      content: () => <AboutPage />
    })
  }
})

// ------------------------
// NOT FOUND / 404
// ------------------------

FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: () => <NotFound />
    });
  }
}
