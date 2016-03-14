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
      itemsDisplayed: this.props.itemsDefaultQty,
      totalItemCount: null
    }

    autoBind(this)
  }

  // componentWillMount() {
  //   if (Meteor.isClient) {
  //     this.setState({
  //       totalItemCount: Counts.get('note_count')
  //     });
  //   }
  // }

  getMeteorData() {
    let currentUser;

    const
	    userDataSub = Meteor.subscribe("userData"),
	    myNotesSub = Meteor.subscribe("myNotes", this.state.itemsDisplayed),
	    subsReady = userDataSub.ready() &&  myNotesSub.ready() 
    ;

    if (userDataSub.ready()) { 
    	currentUser = Meteor.user()
    };    
      
    return {
      subsReady: subsReady,
      currentUser: currentUser,
      collection: Notes.find({}, {sort: { updatedAt: -1 }}).fetch()
    }
  }

  showNewNoteBtn(){
     return this.state.showNewNoteForm? 
      <button className="icon-btn btn-small" alt="Cancel new note" title="Cancel new note"><i className="material-icons">clear</i></button> :
      <IconBtn handleClick={this.toggleNewNoteForm} title="New Note" icon="add" /> ;
  } 

  showNewNoteForm(){
    return this.state.showNewNoteForm? <SingleFieldSubmit placeholder="New Note..." handleInput={this.handleCreateNote} maxLength={AppLib.notes.title.maxLength} handleOnBlur={this.cancelNewNote} /> : <PageTitle pageTitle={this.setNotesListTitle()} />;

  } 

  toggleNewNoteForm(){
    this.setState({ showNewNoteForm: !this.state.showNewNoteForm });
  } 

  cancelNewNote(){
    this.setState({ showNewNoteForm: false });
  }

  handleCreateNote(title) {

    if (AppLib.str.isEmpty(title)) { return; };
  
    //prevent newly created item from displaying before redirect
    this.setState({ itemsDisplayed: AppLib.lists.lockItemCount(this.state.totalItemCount, this.state.itemsDisplayed) });

    Meteor.call('/note/create', title, (err, result) => {
      if (!err) {
        if (Meteor.isClient) {
         Session.set("newNote", true); 
        }
        FlowRouter.go("noteDetail", {_id: result._id});
       
      } else {
        note.catchValidationException(err);
        console.log('there was an error: ' + err.reason);
      };
    });
  } 
  showUserNav(){
    if (this.data.subsReady) {
      return <OptionsMenu userName={this.data.currentUser.profile.fullName} />
    } else {
      return null
    }
  } 
  setNotesListTitle(){
    let noteTitle, firstName;
    if (this.data.subsReady && this.data.currentUser){
      firstName = this.data.currentUser.profile.firstName;
    };
    noteTitle = firstName == null? "My Notes": firstName + "'s Notes";
    return noteTitle;
  } 
  loadMoreItems(){
    this.setState({ itemsDisplayed: this.state.itemsDisplayed + this.props.loadIncrement });
  } 
  // noItems(){
  // 	const msg = "You don't have any notes :-/"
  //   return <div className="centered block-padding"><span className="help-text">{msg}</span></div>
  // } 
  // setMainContent(){

  //    const noNotesMsg = "You currently don't have any notes :-/"
   
  //   if(this.data.subsReady){
  //     if(this.data.collection.length === 0){
  //       return this.noItems();
  //     } else {
  //     	return <List
  //       items={this.data.collection}
  //       deleteItem={true}
  //       handleDeleteItem={this.handleDeleteNote}
  //       deleteMsg="Delete this note?"
  //       noItemsMsg={noNotesMsg}
  //      />
  //     };
  //   } else {
  //   	return <Loading />
  //   }
  // }
  showNotesList(){
    const noNotesMsg = "You currently don't have any notes :-/"
 
    return this.data.subsReady?
      <List
        items={this.data.collection}
        deleteItem={true}
        handleDeleteItem={this.handleDeleteNote}
        deleteMsg="Delete this note?"
        noItemsMsg={noNotesMsg}
       />
    :
      <Loading />  
  }


  render() {

    return (
      <div className="app-container">
        <AppHeader
          headerLeft={this.showNewNoteBtn()}
          headerCenter={this.showNewNoteForm()}
          headerRight={this.showUserNav()}
        />

         <div className="main-content">
         {this.showNotesList()}
        </div> 
      </div>
    )
  }
}
reactMixin(Homepage.prototype, ReactMeteorData)

// {this.showNotesList()}
// <AppFooter />

// Homepage.propTypes = { 
//   inputValue: React.PropTypes.string
// }

Homepage.defaultProps = { 
  pageTitle: AppLib.appInfo.title,
  loadIncrement: 10,
  itemsDefaultQty: 20
}
