import React from 'react'
import {AppHeader} from '../layout/AppHeader.jsx'
import {PageTitle} from '../content/PageTitle.jsx'
import {AppFooter} from '../layout/AppFooter.jsx'
import {IconBtn} from '../forms/buttons/IconBtn.jsx'

export const About = () => {

	const 
	  pagetitle = () => <PageTitle pageTitle="About" />,
	  
	  handleBackBtn = () => history.back(),

	  backBtn = <IconBtn
               handleClick={handleBackBtn}
               title="Go Back" 
               icon="arrow_back" />,

    pageContent = <section><p>Logd is a simple app for creating notes, designed and developed by <a href="http://andersramsay.com/">Anders Ramsay</a>.</p> <p><a href="http://www.google.com/recaptcha/mailhide/d?k=01rjxPtv-5M2bSrszeGK61Eg==&c=-jgul08jNZgfymfgqW7dlQ==">Contact Anders</a>.</p> <p><a href="https://github.com/logd/m13_react_app">Github repo</a>.</p></section>

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

