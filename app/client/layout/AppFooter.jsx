import React from 'react'
import classNames from 'classnames'

export const AppFooter = (props) => {

	const borderTop = props.routeName === "login"? "gray-border-top" : null

	return <footer className="app-footer centered secondary-text">
	<div className={classNames('footer-links', borderTop)}>
	   <ul className="inline-list">
	      <li><a href="http://www.google.com/recaptcha/mailhide/d?k=01TFRfGssWj-3PuYFClMj9sA==&c=2R2mS2abKy2gGIx8plwwQg==" alt="Contact" title="Contact"><i className="fa fa-envelope-o"></i></a></li>
	      <li><a href="/about" alt="About" title="About"><i className="fa fa-info-circle"></i></a></li>
	      <li><a href="https://github.com/logd/meteor_react_app" alt="Logd Github repo" title="Logd Github repo"><i className="fa fa-github"></i></a></li>
	    </ul>
	    </div>
	  </footer>

}
	

