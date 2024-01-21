const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AdventureEntrySchema = new Schema({
  date: { type: Date },
  duration: { type: String },
  country: { type: Stirng },
  city: { type: Stirng },
  travelStyle: { 
    type: String,
		enum: ['Adventure Travel', 'Cultural Travel', 'Luxury Travel', 'Budget Travel']
  }
})

const AdventureEntry = mongoose.model('AdventureEntry', AdventureEntrySchema)
module.exports = AdventureEntry;