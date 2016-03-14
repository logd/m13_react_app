import React from 'react'
// import Alert from 'react-s-alert'

export const MainLayout = ({content}) =>  content()

 // <Alert />
 MainLayout.propTypes = {
  content: React.PropTypes.func.isRequired
}
