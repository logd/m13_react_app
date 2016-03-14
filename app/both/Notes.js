import {Mongo} from 'meteor/mongo'
import {Astro} from 'meteor/jagi:astronomy'

export const Notes = new Mongo.Collection('notes')

export const AstroNote = Astro.Class({
	name: 'Note',
	collection: Notes,
	fields: {
    title: {
      type: 'string',
      validator:Validators.and(
        [
          Validators.required(),
          Validators.maxLength(AppLib.notes.title.maxLength),
          Validators.string()
        ]
      )
    },
    content: {
      type: 'string',
      default: "",
      validator: Validators.and(
        [
          Validators.maxLength(AppLib.notes.content.maxLength),
          Validators.string()
        ]
      )
    },
    updatedAt: {
      type: 'date'
    },
    ownerId: {
      type: 'string'
    },
  },
  events: {
    beforeInsert() {
      this.updatedAt = new Date()
    }
  }
})

Meteor.methods({

	'/note/create': function(title) { 
		const note = new AstroNote()

    note.set({
      title: title,
      ownerId: Meteor.userId()
    });

    if (note.validate()) {
      note.save();
      return note;
    };
    note.throwValidationException();
  },

  '/note/save': function(note) { 
    if (note.validate()) {
      note.save();
      return note;
    };

    note.throwValidationException();
  },

  '/note/delete': function(id) {
  	// console.log("note owner: " + note.ownerId, "user id: " + Meteor.userId())

  	// if (note.ownerId === Meteor.userId()){
  		Notes.remove({_id: id});
  	// }
  }
});

// Meteor.methods({

//   '/note/create': function(note) { 
//     note.set({
//       ownerId: Meteor.userId()
//     });

//     if (note.validate()) {
//       note.save();
//       return note;
//     };
//     note.throwValidationException();
//   },

//   '/note/save': function(note) {

//     if (note.validate()) {
//       note.save();
//       return note;
//     };

//     note.throwValidationException();
//   }

// });





