const express = require('express')
const Adventure = require('../models/adventure'); 

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const adventures = await Adventure.find()
		res.render('index', { adventures: adventures });
	} catch(err) {
		console.error(err);
    res.status(500).send('Internal Server Error');	
	}
})

router.get('/add-adventure', (req, res) => {
	res.render('addAdventure')
})

router.get('/adventure-details/:id', async (req, res) => {
	const adventureId = req.params.id
	const adventure = await Adventure.findById(adventureId)
	console.log(adventure, 'this is adventure')

	if (!adventure) {
		return res.status(404).send('Adventure not found');
	}

	res.render('adventureDetails', { adventure })
})

router.post('/add-adventure', async (req, res) => {
	try {
		const { country, city, date, duration, travelStyle } = req.body;

		const newAdventure = new Adventure({
      country,
      city,
      date,
      duration,
      travelStyle,
    })

		await newAdventure.save();
		res.redirect('/add-adventure');
	} catch (err) {
		console.error(err);
    res.status(500).send('Internal Server Error');
	}
})

router.delete('/adventures/:id', async (req, res) => {
	const adventureId = req.params.id

	try {
		const adventure = await Adventure.findByIdAndDelete(adventureId)
		if (!adventureId) 
			return res.status(404).send('Adventure not found');

		res.status(200).json({ message: 'Adventure deleted successfully', deletedAdventure: adventure });
	} catch (err) {
		console.error(err);
    res.status(500).send('Internal Server Error');
	}
})

module.exports = router