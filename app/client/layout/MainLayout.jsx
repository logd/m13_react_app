import React from 'react'
import Alert from 'react-s-alert'

export const MainLayout = ({content}) =>  <div className="app-container">{content()}<Alert /></div>

MainLayout.propTypes = {
  content: React.PropTypes.func.isRequired
}
