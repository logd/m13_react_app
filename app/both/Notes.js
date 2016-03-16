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

	'/note/create': (title) => { 
		const note = new AstroNote()
    note.set({
      title: title,
      ownerId: Meteor.userId()
    })

    if (note.validate()) {
      note.save()
      return note
    }
    note.throwValidationException()
  },

  '/note/save': (note) => { 
    if (note.validate()) {
      note.save()
      return note
    }
    note.throwValidationException()
  },

  '/note/delete': (id) => Notes.remove({_id: id})

})





