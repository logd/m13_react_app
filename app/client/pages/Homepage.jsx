//GLOBAL
import React from 'react'
import autoBind from 'react-autobind'
import reactMixin from 'react-mixin'

//DATA
import {Notes, AstroNote as Note} from '../../both/Notes'

//COMPONENTS
import {AppHeader} from '../layout/AppHeader.jsx'
import {AppFooter} from '../layout/AppFooter.jsx'
import {PageTitle} from '../content/PageTitle.jsx'
import {OptionsMenu} from '../menus/OptionsMenu.jsx'
import {IconBtn} from '../forms/buttons/IconBtn.jsx'
import {Loading} from '../utility/Loading.jsx'
import {SingleFieldSubmit} from '../forms/SingleFieldSubmit.jsx'
import {List} from '../lists/List.jsx'


export default class Homepage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showNewNoteForm: false,
      itemsDisplayed: this.props.itemsDisplayed
    }
    autoBind(this)
  }

  getMeteorData() {
    let currentUser = null

    const
	    userData = Meteor.subscribe("userData"),
	    notesData = Meteor.subscribe("myNotes", this.state.itemsDisplayed)

    if (userData.ready()) {
      currentUser = Meteor.user()
    }
  
    return {
      userData:    userData,
      notesData:   notesData,
      notesCount: Counts.get('note_count'),
      currentUser: currentUser,
      signedIn: currentUser !== null,
      collection:  Notes.find({}, {sort: { updatedAt: -1 }}).fetch()
    }
  }

  setNotesListTitle(){   
    return this.data.signedIn?
      this.data.currentUser.profile.firstName + "'s Notes"
    : 
      "My Notes"
  }

  showUserMenu(){
   if(this.data.signedIn){
     const menu = <ul className='menu-list'>
       <li>{this.data.currentUser.profile.firstName}</li>
       <li><a href="/logout">Sign Out</a></li>
      </ul>

    return <OptionsMenu menu={menu} />
   }
  
    return null
  }


  showNewNoteBtn(){
    return this.state.showNewNoteForm? 
      <button className="icon-btn btn-small" alt="Cancel new note" title="Cancel new note"><i className="material-icons">clear</i></button>
    :
      <IconBtn handleClick={this.toggleNewNoteForm} title="New Note" icon="add" />
  } 
 
  showNewNoteForm(){
    return this.state.showNewNoteForm?
      <SingleFieldSubmit placeholder="New Note..." handleInput={this.handleCreateNote} maxLength={AppLib.notes.title.maxLength} handleOnBlur={this.cancelNewNote} />
    :
      <PageTitle pageTitle={this.setNotesListTitle()} />
  } 

  toggleNewNoteForm(){
    this.setState({ showNewNoteForm: !this.state.showNewNoteForm })
  } 

  cancelNewNote(){
    this.setState({ showNewNoteForm: false })
  }

  handleCreateNote(title) {

    if (AppLib.str.isEmpty(title)) { return }
  
    //prevent newly created item from displaying in the items list before redirect: get current qty of items displayed
    this.setState({ 
      itemsDisplayed: AppLib.lists.lockItemCount(this.state.totalItemCount, this.state.itemsDisplayed)
    })

    Meteor.call('/note/create', title, (err, result) => {
      if (!err) {
        if (Meteor.isClient) {
         Session.set("newNote", true) 
        }
        FlowRouter.go("noteDetail", {_id: result._id})  
      } else {
        note.catchValidationException(err)
        console.log('there was an error: ' + err.reason)
      }
    })
  }

  handleDeleteNote(note) {
    const confirmDelete = confirm("Really delete '" + note.title + "'?")

    if(confirmDelete){
      Meteor.call('/note/delete', note._id, function(err, result) {
        if (err) {
          console.log('there was an error: ' + err.reason)
        }
      })
    }
  }

  showNotesList(){
    const noNotesMsg = "You currently don't have any notes :-/"
 
    return <List
        items={this.data.collection}
        deleteItem={true}
        handleDeleteItem={this.handleDeleteNote}
        deleteMsg="Delete this note?"
        noItemsMsg={noNotesMsg} 
        defaultItemsDisplayed={5}
        loadMoreItems={this.loadMoreItems}
       />
  }

  render() {
    const loading = <Loading /> 
    const appHeader = this.data.userData.ready?
      <AppHeader
        headerLeft={this.showNewNoteBtn()}
        headerCenter={this.showNewNoteForm()}
        headerRight={this.showUserMenu()}
      />
      :
      <AppHeader
        headerLeft={this.showNewNoteBtn()}
        headerCenter={loading}
        headerRight={null}
      />

    const notesList = this.data.notesData.ready?
      this.showNotesList()
      :
      loading

    return <div className="app-container">
        {appHeader}
         <div className="main-content">
         {notesList}
        </div> 
      </div>
      
  }
}
Homepage.defaultProps = { 
  itemsDisplayed:5
}

reactMixin(Homepage.prototype, ReactMeteorData)
