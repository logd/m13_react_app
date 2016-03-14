import React from 'react'

export const IconBtn = (props) => <button 
  className="icon-btn"
  title={props.title}
  alt={props.title}
  onClick={props.handleClick}
  >
    <i className="material-icons">{props.icon}</i>
</button>

IconBtn.propTypes = {
  handleClick:   React.PropTypes.func.isRequired,
  icon:          React.PropTypes.string.isRequired,
  title:         React.PropTypes.string
}
