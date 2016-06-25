import React from 'react'
// import Alert from 'react-s-alert' / <Alert />

export const MainLayout = ({page}) =>  <div>{page()}</div>

MainLayout.propTypes = {
  page: React.PropTypes.func.isRequired
}
