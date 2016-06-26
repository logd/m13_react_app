import React from 'react'
import {DeleteBtn} from '/imports/ui/forms/buttons/delete_btn'

export const List = (props) => {

  const showDeleteBtn = (item) => {
    return props.deleteItem?
      <DeleteBtn handleDelete={props.handleDeleteItem} {...props} item={item} size="btn-x-small" />
    : 
      null 
  }

  return <ul className="item-list">
    {
      props.items.map((item, index) => {
        //TODO: set path as a prop
        const path = FlowRouter.path( "noteDetail" , {_id: item._id})
        
        return <li key={index} className="list-group-item">
                <div className="item-list-main-content">
                   <a href={path}>{item.title}</a>
                </div>
                {showDeleteBtn(item)}
                </li>
      })
    }
  </ul>
}

List.propTypes = {
  items: React.PropTypes.array.isRequired,
  deleteItem: React.PropTypes.bool,
  handleDeleteItem: React.PropTypes.func
}

List.defaultProps = { 
  deleteItem: false
}