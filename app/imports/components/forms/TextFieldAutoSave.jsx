import React from 'react'
import autoBind from 'react-autobind'
import {TextBtn} from './buttons/TextBtn.jsx'

export default class TextFieldAutoSave extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue
    }
    autoBind(this)
  }

  saveChanges(e){
    const updatedValue = e.target.value
    const saveInterval = 300

    this.setState({inputValue: updatedValue})

    this.autoSave = this.autoSave || _.throttle(content => {
      this.props.handleUpdates(this.props.field, content)
    }, saveInterval)

    this.autoSave(updatedValue)
  }

  doneEditing(e){
    e.preventDefault()
    this.props.doneEditing()
  }

  handleOnBlur(){
    this.props.doneEditing()
  }

  handleOnKeyPress(e) {
    if (AppLib.forms.shiftReturn(e)) {
      e.preventDefault()
      this.doneEditing(e)
      return false
    }
  }

	render() {

    let multiLineForm = <form className="main-content-editing">
                          <textarea
                            className="flex-main-content"
                            placeholder={this.props.placeholder}
                            value={this.state.inputValue}
                            onChange={this.saveChanges}
                            autoFocus={this.props.autoFocus}
                            onBlur={this.props.doneEditing}
                            onKeyPress={this.handleOnKeyPress}
                          />
                          <div className="form-controls flex-column-centered">
                            <TextBtn
                              title="Done" 
                            />
                            <div className="help-text block-padding">(Or use Shift + Return)</div>
                            </div>
                        </form>

    let singleLineForm = <form className="single-field-submit" onSubmit={this.doneEditing}>
                           <input
                              type="text"
                              placeholder={this.props.placeholder}
                              value={this.state.inputValue}
                              onChange={this.saveChanges}
                              autoFocus={this.props.autoFocus}
                              onBlur={this.handleOnBlur}
                            />
                           <input type="submit" style={{display:'none'}} />
                        </form>

    return this.props.multiLine? multiLineForm : singleLineForm 
	}
}

TextFieldAutoSave.propTypes = { 
  inputValue: React.PropTypes.string
}

TextFieldAutoSave.defaultProps = { 
  inputValue:"",
  autoFocus: false
}
