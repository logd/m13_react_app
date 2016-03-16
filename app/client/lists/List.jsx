import React from 'react'
import {DeleteBtn} from '../forms/buttons/DeleteBtn.jsx'

export const List = (props) => {

  const

    showDeleteBtn = (item) => {
      return props.deleteItem? <DeleteBtn handleDelete={props.handleDeleteItem} {...props} item={item} /> : null 
    }
    ,

    noItems = (items) => items.length === 0

    ,

    noItemsMsg = (msg = "There are currently no items.") => <div className="centered block-padding"><span className="help-text">{msg}</span></div>
    ,

    listItems = (items) => {
      return <ul className="item-list">
              {
                items.map((item, index) => {
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

  return noItems(props.items)? noItemsMsg(props.noItemsMsg) : listItems(props.items)
}

List.propTypes = {
  items: React.PropTypes.array.isRequired,
  noItemsMsg: React.PropTypes.string,
  deleteItem: React.PropTypes.bool,
  handleDeleteItem: React.PropTypes.func
}

List.defaultProps = { 
  deleteItem: false
}