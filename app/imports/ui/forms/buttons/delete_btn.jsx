import React from 'react'
import {IconBtn} from './icon_btn'

export const DeleteBtn = (props) => {

 const handleDelete = () => {
 	  const confirmDelete = confirm("Really delete this note?")

 	  if (confirmDelete) {
 	  	props.handleDelete(props.item)
 	  }
	
 }

 return <IconBtn handleClick={handleDelete} title={props.deleteMsg} icon="delete" size={props.size} />
}

DeleteBtn.propTypes = {
  item: React.PropTypes.object.isRequired,
  deleteMsg: React.PropTypes.string
}

DeleteBtn.defaultProps = {
  deleteMsg: "Delete this..."
}
