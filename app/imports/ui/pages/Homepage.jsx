//GLOBAL
import React from 'react'
import autoBind from 'react-autobind'
import reactMixin from 'react-mixin'

//COMPONENTS
import { AppHeader }         from '/imports/ui/layouts/app_header'
import { AppFooter }         from '/imports/ui/layouts/app_footer'
import { PageTitle }         from '/imports/ui/content/page_title'
import { OptionsMenu }       from '/imports/ui/menus/options_menu'
import { IconBtn }           from '/imports/ui/forms/buttons/icon_btn'
import { Loading }           from '/imports/ui/utility/loading'
import { SingleFieldSubmit } from '/imports/ui/forms/single_field_submit'
import { ListContainer }     from '/imports/ui/lists/list_container'

export default class Homepage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showNewNoteForm: false
    }
    autoBind(this)
  }

  getMeteorData() {
    let currentUser = null

    const subscription = Meteor.subscribe("userData")
 
    if (subscription.ready()) {
      currentUser = Meteor.user()
    }
  
    return {
      subscription: subscription,
      currentUser: currentUser,
      signedIn: currentUser !== null
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


  loadMoreItems(qty){
    this.setState({
      itemsDisplayed: this.state.itemsDisplayed + qty
    })
  }

  render() {
    const loading = <Loading /> 
    const appHeader = this.data.subscription.ready?
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

    return <div className="app-container">
             {appHeader}
             <div className="main-content">
              <ListContainer />
             </div>
             <AppFooter />
           </div>
      
  }
}

reactMixin(Homepage.prototype, ReactMeteorData)
