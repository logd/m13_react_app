import React from 'react'
import classNames from 'classnames'

export const IconBtn = (props) => <button 
  className={classNames('icon-btn', props.size)}
  title={props.title}
  alt={props.title}
  onClick={props.handleClick}
  >
    <i className="material-icons">{props.icon}</i>
</button>

IconBtn.propTypes = {
  handleClick:   React.PropTypes.func.isRequired,
  icon:          React.PropTypes.string.isRequired,
  title:         React.PropTypes.string,
  size:          React.PropTypes.string
}