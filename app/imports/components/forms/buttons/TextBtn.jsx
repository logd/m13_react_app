import React from 'react'

export const TextBtn = (props) => <button 
  className="btn"
  title={props.title}
  alt={props.title}
  onClick={props.handleClick}
  >
    {props.title} 
</button>

TextBtn.propTypes = {
  handleClick:   React.PropTypes.func,
  title:         React.PropTypes.string.isRequired
}
