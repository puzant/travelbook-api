const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AdventureSchema = new Schema({
  date: { type: Date },
  duration: { type: String },
  country: { type: String },
  city: { type: String },
  travelStyle: { 
    type: String,
		enum: ['Adventure Travel', 'Cultural Travel', 'Luxury Travel', 'Budget Travel']
  }
})

const Adventure = mongoose.model('Adventure', AdventureSchema)
module.exports = Adventure;