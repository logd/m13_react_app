import {Notes} from '../both/Notes'

const
  myNotesFields = {
   "title" : true,
   "updatedAt": true
  }
  , 
  noteDetailFields = {
   "title" : true,
   "content": true,
   "updatedAt": true
  }

Meteor.publish('myNotes', function(limit) {
   // check(limit, Number);
  Counts.publish(this, 'note_count', Notes.find({ ownerId: this.userId }), { noReady: true })

  return Notes.find({ ownerId: this.userId }, {fields: myNotesFields, limit: limit })
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