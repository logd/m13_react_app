//GLOBAL
import React from 'react'
import reactMixin from 'react-mixin'
import ReactMarkdown from 'react-markdown'
import autoBind from 'react-autobind'

//DATA
import {Notes} from '../../both/Notes'

//COMPONENTS
import {AppHeader} from '../layout/AppHeader.jsx'
import {IconBtn} from '../forms/buttons/IconBtn.jsx'
import {PageTitle} from '../content/PageTitle.jsx'
import {EditableText} from '../content/EditableText.jsx'
import {Loading} from '../utility/Loading.jsx'


export default class NoteDetail extends React.Component {

  constructor(props) {
    super(props)
    autoBind(this)
  }

  getMeteorData() {
    const
      noteId = FlowRouter.getParam("_id"),
      subscription = Meteor.subscribe('myCurrentNote', noteId),
      subsReady = subscription.ready(),
      note = subscription.ready()? Notes.findOne({ _id: noteId }) : null
     
    return {
      subsReady: subsReady,
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