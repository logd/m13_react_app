import React from 'react'
import { AppLib } from '/imports/lib/app_lib'

export const PageTitle = props => <h1 className="page-title">{props.pageTitle}</h1>

PageTitle.propTypes = {
	pageTitle: React.PropTypes.string
}

PageTitle.defaultProps = { 
  pageTitle: AppLib.appInfo.title
}


    
