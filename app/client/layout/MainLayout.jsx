import React from 'react'

export const MainLayout = ({content}) =>  content()

 MainLayout.propTypes = {
  content: React.PropTypes.func.isRequired
}
