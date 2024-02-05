const { body } = require('express-validator')

const adventureValidator = [
  body('country', 'Country field is required').notEmpty(),
  body('city', 'city field is required').notEmpty(),
  body('date', 'Date field is required').notEmpty(),
  body('duration', 'Duration field is required').notEmpty(),
  body('travelStyle', 'Travel Style field is required').notEmpty(),
]

module.exports = adventureValidator