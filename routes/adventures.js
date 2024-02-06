const express = require('express');
const { validationResult } = require('express-validator')

const Adventure = require('../models/adventure');
const adventureValidator = require('../validators/adventures')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const adventures = await Adventure.find();
    res.json({
      adventures: adventures
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/adventure-details/:id', async (req, res) => {
  const adventureId = req.params.id;
  const adventure = await Adventure.findById(adventureId);

  if (!adventure) {
    return res.status(404).send('Adventure not found');
  }

  res.json({ adventure: adventure });
});

router.post('/add-adventure', adventureValidator, async (req, res) => {
  const result = validationResult(req)

  if (result.isEmpty()) {
    const { country, city, date, duration, travelStyle } = req.body;
    const newAdventure = new Adventure({
      country,
      city,
      date,
      duration,
      travelStyle,
    });

    await newAdventure.save();
    res.json({ adventure: newAdventure })
  } else {
    res.send({ errors: result.array() })
  }
});

router.put('/adventure/:id', adventureValidator, async (req, res) => {
  const result = validationResult(req)
  const adventureId = req.params.id;

  if (result.isEmpty()) {
    const adventure = await Adventure.findById(adventureId);
    const { country, city, date, duration, travelStyle, images, videos } = req.body;

    adventure.country = country;
    adventure.city = city;
    adventure.date = date;
    adventure.duration = duration;
    adventure.travelStyle = travelStyle;
    adventure.images = images;
    adventure.videos = videos;

    await adventure.save();

    res.status(200).json({
      message: 'Adventure edited successfully',
      adventure: adventure,
    });
  } else {
    res.send({ errors: result.array() })
  }
});

router.delete('/adventures/:id', async (req, res) => {
  const adventureId = req.params.id;

  try {
    const adventure = await Adventure.findByIdAndDelete(adventureId);
    if (!adventureId) return res.status(404).send('Adventure not found');

    res.status(200).json({
      message: 'Adventure deleted successfully',
      deletedAdventure: adventure,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
