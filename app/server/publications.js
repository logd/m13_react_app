import {Notes} from '../both/Notes'

const
  myNotesFields = {
   "title" : true,
   "updatedAt": true
  }
  , 
  noteDetailFields = {
   "title" : true,
   "content": true
  }

Meteor.publish('myNotes', function() {
   // check(limit, Number);
    // Counts.publish(this, 'note_count', Notes.find({ ownerId: this.userId }), { noReady: true });

  return Notes.find({ ownerId: this.userId }, {fields: myNotesFields })
  // return Notes.find({ ownerId: this.userId }, {fields: myNotesFields }, {limit: limit }); 
})

Meteor.publish('myCurrentNote', function(id) {
  check(id, String)

  return Notes.find({ _id: id, ownerId: this.userId }, { fields: noteDetailFields }) 
})

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find(
      {_id: this.userId},
      {
        fields: {
        "profile.firstName" : true,
        "profile.fullName" : true 
        }
      }
    )

  } else {
    this.ready();
  }
})