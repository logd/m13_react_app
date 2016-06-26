import React from 'react'
import { AppHeader }   from '/imports/ui/layouts/app_header'
import { PageTitle }   from '/imports/ui/content/page_title'
import { AppFooter }   from '/imports/ui/layouts/app_footer'
import { IconBtn }     from '/imports/ui/forms/buttons/icon_btn'

export const About = () => {

	const 
	  pagetitle = () => <PageTitle pageTitle="About" />,
	  
	  handleBackBtn = () => history.back(),

	  backBtn = <IconBtn
               handleClick={handleBackBtn}
               title="Go Back" 
               icon="arrow_back" />,

    pageContent = <section>
      <p>This is a tool for quickly creating personal notes. Just create a note and start typing. Changes are auto-saved as you type. You can use <a href="https://daringfireball.net/projects/markdown/">markdown</a> and basic HTML. The app was built using <a href="https://www.meteor.com/">Meteor</a> and <a href="https://facebook.github.io/react/">React</a>. Code is available on <a href="https://github.com/logd/m13_react_app">github</a>.</p>
      <p>Here is an example of using the app to create an outline for a workshop:</p>
      <img width="600" alt="logd app example" src="https://cloud.githubusercontent.com/assets/819213/12678683/fde3510c-c66d-11e5-9dc8-ed5e5797eb88.png" />
      <p>Designed and developed by <a href="http://andersramsay.com/">Anders Ramsay</a>.</p> 
      <p><a href="http://www.google.com/recaptcha/mailhide/d?k=01rjxPtv-5M2bSrszeGK61Eg==&c=-jgul08jNZgfymfgqW7dlQ==">Contact Anders</a>.</p> <p><a href="https://twitter.com/codechron">Follow on Twitter</a>.</p>
    </section>

    return <div className="app-container">
        <AppHeader
          headerLeft={backBtn}          
          headerCenter={pagetitle()}
        />
        <div className="main-content">
          {pageContent}
        </div>
         <AppFooter/>
      </div>
}


