// GLOBAL
import React from 'react'
import {mount} from 'react-mounter'

//LAYOUTS
import {MainLayout} from './layout/MainLayout'

//COMPONENTS
// import Alert from 'react-s-alert'

//PAGES
import Homepage from './pages/Homepage'
import NoteDetail from './pages/NoteDetail'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {NotFound} from './pages/NotFound'


// ------------------------
// TRIGGERS/HOOKS
// ------------------------
function redirectIfAnonymous(context, redirect) {
  // context is the output of `FlowRouter.current()
  AppLibRedirectPath = context.path
  var notSignedIn = !Meteor.userId() && !Meteor.loggingIn()
  if (notSignedIn) {
    console.log('entered notSignedIn')
    redirect('/login')
    // Alert.info("Please sign in to continue.", {effect: 'stackslide', position: 'top', timeout: 2500,})
  }
}

function redirectIfSignedIn(context, redirect) {
  if (Meteor.userId()) {
    if (AppLibRedirectPath != null) {
      redirect(AppLibRedirectPath);
    } else {
     redirect('home') 
    }
  }
}


// ------------------------
// Login/Signup/Logout
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

FlowRouter.route('/logout', {
  name: 'logout',
  action: function() {
    Meteor.logout(function(){
      FlowRouter.go('login')
      // Alert.info("You've been signed out.", {effect: 'stackslide', position: 'top', timeout: 2000,})
    })
  }
})

FlowRouter.route('/signup', {
  name: 'signup',
   triggersEnter: [function (){
      if (Meteor.userId()) {
        FlowRouter.go('home');
        Alert.info("Please sign out before signing up.", {effect: 'stackslide', position: 'top', timeout: 2500,})
      }
    }
  ],
  action() {
    mount(MainLayout, {
      content: () => <Signup />
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

FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: () => <NotFound />
    });
  }
}
