//GLOBAL
// import { Meteor } from 'meteor/meteor'
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
    // this.handleUpdates = this.handleUpdates.bind(this)

    // this.state = {
    //   inputValue: this.props.inputValue
    // }
  }

  getMeteorData() {
    const
      noteId = FlowRouter.getParam("_id"),
      subscription = Meteor.subscribe('myCurrentNote', noteId),
      subsReady = subscription.ready()
    ;

    let note;

    if (subscription.ready()){
      note = Notes.findOne({ _id: noteId })
    }
     
    return {
      subsReady: subsReady,
      note: note
    }
  }

  handleUpdates(field, value){
    let note = this.data.note
    let noteFields = {}

    noteFields[field] = value

    note.set(noteFields)

    Meteor.call('/note/save', note, (err, result) => {
      if (err) {
        note.catchValidationException(err)
        console.log('there was an error: ' + err.reason)
      } 
    })
  }

  showNoteTitle(){

    if (this.data.subsReady) {
      const contentBlock = <PageTitle pageTitle={this.data.note.title} />


      return <EditableText
              contentBlock={contentBlock}
              editableText={this.data.note.title}
              field="title"
              multiLine={false}
              handleUpdates={this.handleUpdates}
            />
    } else {
      return <Loading />
    }
  }

  showNoteContent(){

    const emptyNote = <div className="centered gray-pill help-text">Empty note</div>

    if (this.data.subsReady) {
      const contentBlock = this.data.note.content === ""? emptyNote : <ReactMarkdown source={this.data.note.content} />;
      
      return <EditableText
              contentBlock={contentBlock}
              editableText={this.data.note.content}
              field="content"
              multiLine={true}
              handleUpdates={this.handleUpdates}
            />
    } else {
      return <Loading />
    }
  }

  handleBackBtn(){
    FlowRouter.go('homepage')
  }

	render(){
    const backBtn = <IconBtn
              handleClick={this.handleBackBtn}
              title="Go Back" 
              icon="arrow_back" />;

		return (
			<div className="app-container">
			  <AppHeader
          headerLeft={backBtn}
          headerCenter={this.showNoteTitle()}
        />
			  <div className="main-content">
			   {this.showNoteContent()}
			  </div>
      </div>
		) 
	}
}

reactMixin(NoteDetail.prototype, ReactMeteorData)
