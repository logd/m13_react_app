import React from 'react'
import { AppHeader } from '/imports/ui/layouts/app_header'
import { PageTitle } from '/imports/ui/content/page_title'


export const NotFound = () =>{
	 const
	   pageTitle = <PageTitle pageTitle="Sorry, nothing here :-/" />,
	   notFoundMsg = <p>Maybe <a href="/">try the homepage?</a></p>

	 return <div className="app-container">
            <AppHeader headerCenter={pageTitle} />
            <main className="main-content layout-centered centered">
               {notFoundMsg}
            </main>
          </div>
}