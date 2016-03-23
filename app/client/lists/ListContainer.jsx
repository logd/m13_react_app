import React from 'react'
import autoBind from 'react-autobind'
import reactMixin from 'react-mixin'
import {Notes} from '../../both/Notes'
import {List} from './List.jsx'
import {TextBtn} from '../forms/buttons/TextBtn.jsx'
import {Loading} from '../utility/Loading.jsx'

export class ListContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      displayCount: this.props.itemBlockSize
    }
    autoBind(this)
  }

  getMeteorData() {
    const
      subscription = Meteor.subscribe("myNotes", this.state.itemsDisplayed)
      ,
      notesCount = subscription.ready?
        Counts.get('note_count')
      : 
        null

  
    return {
      subscription:  subscription,
      notesCount:    notesCount,
      collection:    Notes.find({}, {sort: { updatedAt: -1 }}).fetch()
    }
  }

  // noItems(){
  //   return this.props.itemCount === 0
  // } 

  showLoadMore(currentlyDisplayed, totalCount){
    return currentlyDisplayed > totalCount?
      <div className="centered">
        <TextBtn
          title="Load More..."
          handleClick={this.loadMoreItems}
        />
      </div>
    :
      null
  } 

  loadMoreItems(){
    this.props.loadMoreItems(this.props.itemBlockSize)
  } 

  noItemsMsg(msg = "There are no items."){
    return <div className="centered block-padding"><span className="help-text">{msg}</span></div>
  }

    
  render() {

    if (this.data.subscription.ready) {
      return this.data.notesCount === 0?
        this.noItemsMsg(this.props.noItemsMsg)
      : 
        <div>
          <List items={this.data.collection} />
           {this.showLoadMore(this.state.itemsDisplayed, this.data.notesCount)}
        </div>
    } else {
      return <Loading />
    }
  }
}

    // const notesList = this.subscription.ready?
    //   this.showNotesList()
    //   :
      

    // return <div className="app-container">
    //     {appHeader}
    //      <div className="main-content">
    //      {notesList}
    //     </div> 
    //   </div>

ListContainer.propTypes = {
  defaultItemsDisplayed: React.PropTypes.number,
  itemLoadIncrement: React.PropTypes.number,
  noItemsMsg: React.PropTypes.string,
  deleteItem: React.PropTypes.bool,
  handleDeleteItem: React.PropTypes.func
}

ListContainer.defaultProps = { 
  deleteItem: false,
  itemBlockSize: 20
}


reactMixin(ListContainer.prototype, ReactMeteorData)