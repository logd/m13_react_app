import React from 'react'
// import Alert from 'react-s-alert'

export const MainLayout = ({content}) => <div className="app-container"> {content()}</div>

 // <Alert />
 MainLayout.propTypes = {
  content: React.PropTypes.func.isRequired
}
