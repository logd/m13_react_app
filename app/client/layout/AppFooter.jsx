import React from 'react'
import classNames from 'classnames'

export const AppFooter = (props) => {

	const borderTop = props.routeName === "login"? "gray-border-top" : null

	return <footer className="app-footer centered secondary-text">
	<div className={classNames('footer-links', borderTop)}>
	   <ul className="inline-list">
	      <li><a href="http://www.google.com/recaptcha/mailhide/d?k=01rjxPtv-5M2bSrszeGK61Eg==&c=-jgul08jNZgfymfgqW7dlQ==" alt="Contact" title="Contact"><i className="fa fa-envelope-o"></i></a></li>
	      <li><a href="/about" alt="About" title="About"><i className="fa fa-info-circle"></i></a></li>
	      <li><a href="https://github.com/logd/m13_react_app" alt="Logd Github repo" title="Logd Github repo"><i className="fa fa-github"></i></a></li>
	      <li><a href="https://twitter.com/codechron" alt="Twitter" title="Twitter"><i className="fa fa-twitter"></i></a></li>
	    </ul>
	    </div>
	  </footer>

}
	

