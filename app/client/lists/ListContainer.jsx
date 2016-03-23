import React from 'react'
import autoBind from 'react-autobind'
import {TextBtn} from '../forms/buttons/TextBtn.jsx'

export class ListContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      displayedItems: this.props.defaultItemsDisplayed
    }
    autoBind(this)
  }
  noItems(){
    return this.props.totalItems === 0
  } 

  showLoadMore(){
    return this.props.totalItems > this.state.displayedItems?
      <div className="centered">
        <TextBtn
          title="Load More..."
          handleClick={this.loadMoreItems()}
        />
      </div>
    :
      null
  } 

  loadMoreItems(){
    this.props.loadMoreItems(itemLoadIncrement)
  } 

  noItemsMsg(msg = "There are no items."){
    return <div className="centered block-padding"><span className="help-text">{msg}</span></div>
  }

  showDeleteBtn(item){
    return this.props.deleteItem?
      <DeleteBtn handleDelete={this.props.handleDeleteItem} {...this.props} item={item} size="btn-x-small" />
    : 
      null 
  }

  listItems(items){
    return <ul className="item-list">
      {
        items.map((item, index) => {
          const path = FlowRouter.path( "noteDetail" , {_id: item._id})
          
          return <li key={index} className="list-group-item">
                  <div className="item-list-main-content">
                     <a href={path}>{item.title}</a>
                  </div>
                  {this.showDeleteBtn(item)}
                  </li>
        })
      }
    </ul>
  } 
    
  render() { 

    return this._noItems()?
      this.noItemsMsg(this.props.noItemsMsg)
    : 
      <div>{this.listItems(this.props.items)}{this._showLoadMore()}</div>
  }

}

ListContainer.propTypes = {
  items: React.PropTypes.array.isRequired,
  defaultItemsDisplayed: React.PropTypes.number,
  itemLoadIncrement: React.PropTypes.number,
  noItemsMsg: React.PropTypes.string,
  deleteItem: React.PropTypes.bool,
  handleDeleteItem: React.PropTypes.func
}

ListContainer.defaultProps = { 
  deleteItem: false,
  defaultItemsDisplayed: 20,
  itemLoadIncrement: 10
}