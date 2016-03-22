import React from 'react'
import {IconBtn} from './IconBtn'

export const DeleteBtn = (props) => {

 const handleDelete = () => {
		props.handleDelete(props.item);
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
