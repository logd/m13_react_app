import React from 'react'
import { PageTitle } from '/imports/ui/content/page_title'

export const AppHeader = (props) => 
	<header className="app-header">
	  <div className="header-left">
	   {props.headerLeft}
	  </div>
	  <div className="header-center">
	    {props.headerCenter}
	  </div>
	  <div className="header-right">
      {props.headerRight}
    </div>
	</header>

AppHeader.propTypes = {
  headerLeft: React.PropTypes.object,
  headerCenter: React.PropTypes.object,
  headerRight: React.PropTypes.object
}

AppHeader.defaultProps = { 
  headerCenter: <PageTitle />
}
