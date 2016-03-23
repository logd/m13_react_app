import React from 'react'
import autoBind from 'react-autobind'
import {List} from './List.jsx'
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
    return this.props.itemCount === 0
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

  // showDeleteBtn(item){
  //   return this.props.deleteItem?
  //     <DeleteBtn handleDelete={this.props.handleDeleteItem} {...this.props} item={item} size="btn-x-small" />
  //   : 
  //     null 
  // }
    
  render() { 

    return this.noItems()?
      this.noItemsMsg(this.props.noItemsMsg)
    : 
      <div>
        <List {...this.props} />
        {this.showLoadMore()}
      </div>
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