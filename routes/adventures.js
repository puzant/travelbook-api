const express = require('express')
const Adventure = require('../models/adventure'); 

const router = express.Router()

const mockdata = [
	{
		date: '2022-9/2',
		duration: '16',
		country: 'Armenia',
		city: 'Yerevan',
		travelStyle: 'Adventure Travel'
	},
	{
		date: '2015-5/10',
		duration: '10',
		country: 'Lebanon',
		city: 'Beirut',
		travelStyle: 'Adventure Travel'
	},
]

router.get('/', async (req, res) => {
	res.render('index', { adventures: mockdata });
})

router.get('/add-adventure', async (req, res) => {
	res.render('addAdventure')
})

router.post('/', async (req, res) => {
	console.log('post')
})

module.exports = router