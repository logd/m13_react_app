//GLOBAL
import React from 'react'
import autoBind from 'react-autobind'
import reactMixin from 'react-mixin'

//DATA
// import {Notes, AstroNote} from '../../both/collections/Notes'

//COMPONENTS
// import {ActionBtn} from '../components/forms/ActionBtn.jsx'
// import {SingleFieldSubmit} from '../forms/SingleFieldSubmit.jsx'
import {PageTitle} from '../content/PageTitle.jsx'


// export default class Homepage extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       showNewNoteForm: false,
//       itemsDisplayed: this.props.itemsDefaultQty,
//       totalItemCount: null
//      }

//     autoBind(this)
//   }

//   componentWillMount() {
//     if (Meteor.isClient) {
//       this.setState({
//         totalItemCount: Counts.get('note_count')
//       });
//     }
//   }
//   getMeteorData() {
//     let currentUser;
//     const
//       subscriptions = [
//         Meteor.subscribe("myNotes", this.state.itemsDisplayed),
//         Meteor.subscribe("userData")
//       ],
//       subsReady = _.every(subscriptions, function (sub) { return sub.ready(); })
//     ;

//     if (subsReady) { currentUser = Meteor.user(); };
      
//     return {
//       subsReady: subsReady,
//       currentUser: currentUser,
//       collection: Notes.find({}, {sort: { updatedAt: -1 }}).fetch()
//     }
//   }

//   showNewNoteBtn(){
//      return this.state.showNewNoteForm? 
//       <button className="icon-btn btn-small" alt="Cancel new note" title="Cancel new note"><i className="material-icons">clear</i></button> :
//       <ActionBtn btnAction={this.toggleNewNoteForm} btnTitle="New Note" btnIcon="add" /> ;
//   } 

//   showNewNoteForm(){
//     return this.state.showNewNoteForm? <SingleFieldSubmit placeholder="New Note..." handleInput={this.handleCreateNote} maxLength={AppLib.notes.title.maxLength} handleOnBlur={this.cancelNewNote} /> : <PageTitle pageTitle={this.setNotesListTitle()} />;

//   } 

//   toggleNewNoteForm(){
//     this.setState({ showNewNoteForm: !this.state.showNewNoteForm });
//   } 

//   cancelNewNote(){
//     this.setState({ showNewNoteForm: false });
//   }

//   handleCreateNote(inputValue) {

//     if (AppLib.str.isEmpty(inputValue)) { return; };
  
//     //prevent newly created item from displaying before redirect
//     this.setState({ itemsDisplayed: AppLib.lists.lockItemCount(this.state.totalItemCount, this.state.itemsDisplayed) });

//     this.note.set({
//       title: inputValue
//     });
//     Meteor.call('/note/create', this.note, (err, result) => {
//       if (!err) {
//         if (Meteor.isClient) {
//          Session.set("newNote", true); 
//         }
//         FlowRouter.go("noteDetail", {_id: result._id});
       
//       } else {
//         note.catchValidationException(err);
//         console.log('there was an error: ' + err.reason);
//       };
//     });
//   } 
//   showUserNav(){
//     if (this.data.subsReady) {
//       return <OptionsMenu userName={this.data.currentUser.profile.fullName} />;
//     } else {
//       return null;
//     };
//   } 
//   setNotesListTitle(){
//     let noteTitle, firstName;
//     if (this.data.subsReady && this.data.currentUser){
//       firstName = this.data.currentUser.profile.firstName;
//     };
//     noteTitle = firstName == null? "My Notes": firstName + "'s Notes";
//     return noteTitle;
//   } 
//   loadMoreItems(){
//     this.setState({ itemsDisplayed: this.state.itemsDisplayed + this.props.loadIncrement });
//   } 
//   noItems(){
//     return <div className="centered block-padding"><HelpMsg msg="You don't have any notes :-/" /></div>;
//   } 
//   setMainContent(){
//     let mainContent = <LoadingSpinner />;
//     if(this.data.subsReady){
//       if(this.data.collection.length === 0){
//         mainContent = this.noItems();
//       } else {
//       mainContent = <LinkList linkTo="noteDetail" collection={this.data.collection} itemsDisplayed={this.state.itemsDisplayed} totalItems={this.state.totalItemCount} deleteItem={true} loadMoreItems={this.loadMoreItems}  />;
//       };
//     }
//     return mainContent;
//   }

//   render() {
   
//     return (
//       <div className="app-container">
//         <AppHeader
//           headerLeft={this.showNewNoteBtn()}
//           headerCenter={this.showNewNoteForm()}
//           headerRight={this.showUserNav()}
//           handleCreate={this.handleCreateNote}
//           pageTitle={this.setNotesListTitle()}
//         />
//         <div className="main-content">
//          {this.setMainContent()}
//         </div>
//          <AppFooter />
//       </div>
//     )
//   }
// }

// Homepage.propTypes = { 
//   inputValue: React.PropTypes.string
// }

// Homepage.defaultProps = { 
//   pageTitle: AppLib.appInfo.title,
//   loadIncrement: 10,
//   itemsDefaultQty: 20
// }
