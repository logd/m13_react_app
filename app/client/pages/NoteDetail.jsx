//GLOBAL
import React from 'react'
import reactMixin from 'react-mixin'
import ReactMarkdown from 'react-markdown'
import autoBind from 'react-autobind'

//DATA
import {Notes} from '../../both/Notes'

//COMPONENTS
import {AppHeader} from '../layout/AppHeader'
import {IconBtn} from '../forms/buttons/IconBtn'
import {PageTitle} from '../content/PageTitle'
import {OptionsMenu} from '../menus/OptionsMenu'
import {EditableText} from '../content/EditableText'
import {Loading} from '../utility/Loading'


export default class NoteDetail extends React.Component {

  constructor(props) {
    super(props)
    autoBind(this)
  }

  getMeteorData() {
    let currentUser = null

    const
      noteId = FlowRouter.getParam("_id"),
      userData = Meteor.subscribe("userData"),
      subscription = Meteor.subscribe('myCurrentNote', noteId),
      subsReady = subscription.ready(),
      note = subscription.ready()? Notes.findOne({ _id: noteId }) : null

    if (userData.ready()) {
      currentUser = Meteor.user()
    }
  
     
    return {
      subsReady: subsReady,
      signedIn: currentUser !== null,
      currentUser: currentUser,
      note: note
    }
  }

  handleUpdates(field, value){
    const 
      note = this.data.note,
      noteFields = {}

    noteFields[field] = value
    note.set(noteFields)

    Meteor.call('/note/save', note, (err, result) => {
      if (err) {
        note.catchValidationException(err)
        console.log('there was an error: ' + err.reason)
      } 
    })
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

  noteTitle(){
    const contentBlock = <PageTitle pageTitle={this.data.note.title} />

    return <EditableText
            contentBlock={contentBlock}
            editableText={this.data.note.title}
            field="title"
            multiLine={false}
            handleUpdates={this.handleUpdates}
          />
  }

  noteContent(){
    return this.data.note.content === ""?
      <div className="centered gray-pill help-text">Empty note</div>
    : 
      <ReactMarkdown source={this.data.note.content} />
  }

  handleBackBtn(){
    FlowRouter.go('homepage')
  }

	render(){
    const backBtn = <IconBtn
              handleClick={this.handleBackBtn}
              title="Go Back" 
              icon="arrow_back" />,
          loading = <Loading />

		return this.data.subsReady?
			<div className="app-container">
			  <AppHeader
          headerLeft={backBtn}
          headerCenter={this.noteTitle()}
          headerRight={this.showUserMenu()}
        />
			  <div className="main-content">
  			   <EditableText
            contentBlock={this.noteContent()}
            editableText={this.data.note.content}
            field="content"
            multiLine={true}
            handleUpdates={this.handleUpdates}
          />
			  </div>
      </div>
      :
      <div className="app-container">
        <AppHeader
          headerLeft={backBtn}
          headerCenter={loading}
        />
        <div className="main-content">
         {loading}
        </div>
      </div>
	}
}

reactMixin(NoteDetail.prototype, ReactMeteorData)