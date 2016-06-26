import React from 'react'
import autoBind from 'react-autobind'
import reactMixin from 'react-mixin'
import { Note } from '/imports/collections/notes'
import { List } from './List.jsx'
import { TextBtn} from '../forms/buttons/TextBtn.jsx'
import { Loading } from '../utility/Loading.jsx'

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
      subscription = Meteor.subscribe("myNotes", this.state.displayCount)
      ,
      notesCount = subscription.ready?
        Counts.get('note_count')
      : 
        null

  
    return {
      subscription:  subscription,
      totalCount:    notesCount,
      collection:    Note.find({}, {sort: { updatedAt: -1 }}).fetch()
    }
  }

  showLoadMore(currentlyDisplayed, totalCount){
    return currentlyDisplayed < totalCount?
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
    this.setState({
      displayCount: this.state.displayCount + this.props.itemBlockSize
    })
  }

  noItemsMsg(msg = "There are no items."){
    return <div className="centered block-padding"><span className="help-text">{msg}</span></div>
  }
  //TODO: make not specific to notes
  handleDeleteItem(item) {
    const confirmDelete = confirm("Really delete '" + item.title + "'?")

    if(confirmDelete){
      Meteor.call('/note/delete', item._id, function(err, result) {
        if (err) {
          console.log('there was an error: ' + err.reason)
        }
      })
    }
  }

    
  render() {

    if (this.data.subscription.ready) {
      return this.data.totalCount === 0?
        this.noItemsMsg(this.props.noItemsMsg)
      : 
        <div>
          <List
            items={this.data.collection}
            deleteItem={true}
            handleDeleteItem={this.handleDeleteItem}
            deleteMsg="Delete this note?"
          />
           {this.showLoadMore(this.state.displayCount, this.data.totalCount)}
        </div>
    } else {
      return <Loading />
    }
  }
}

ListContainer.propTypes = {
  itemBlockSize: React.PropTypes.number,
  deleteItem: React.PropTypes.bool
}

ListContainer.defaultProps = { 
  deleteItem: false,
  itemBlockSize: 20
}


reactMixin(ListContainer.prototype, ReactMeteorData)