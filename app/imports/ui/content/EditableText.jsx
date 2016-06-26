import React from 'react'
import autoBind from 'react-autobind'
import TextFieldAutoSave from '../forms/TextFieldAutoSave.jsx'

export class EditableText extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: this.props.editMode
    }
    autoBind(this)
  }
  
  setEditMode(){
    this.setState({ editMode: true })
  }

  doneEditing(){
     this.setState({ editMode: false })
  }

  showField(){

    return this.state.editMode?
      <TextFieldAutoSave
        autoFocus={true}
        inputValue={this.props.editableText}
        multiLine={this.props.multiLine}
        doneEditing={this.doneEditing}
        handleUpdates={this.props.handleUpdates}
        field={this.props.field}
      />
    : 
        <span className="editable" onClick={this.setEditMode}>{this.props.contentBlock}</span>
    ;
  }

  render(){
    return this.showField()
  }
}

EditableText.propTypes = { 
  editMode: React.PropTypes.bool,
  handleUpdates: React.PropTypes.func
}

EditableText.defaultProps = {
  editMode: false
}
