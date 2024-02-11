const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  originalName: String,
  path: String,
  size: Number,
  mimeType: String,
  uploadDate: { type: Date, default: Date.now }
})

const AdventureSchema = new Schema({
  date: { type: Date },
  duration: { type: String },
  country: { type: String },
  city: { type: String },
  travelStyle: { 
    type: String,
    enum: ['Adventure Travel', 'Cultural Travel', 'Luxury Travel', 'Budget Travel']
  },
  images: [ImageSchema],
  videos: [String]
})

const Adventure = mongoose.model('Adventure', AdventureSchema)

module.exports = Adventure