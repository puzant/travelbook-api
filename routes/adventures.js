const express = require('express');
const multer = require('multer')
const { validationResult } = require('express-validator')
const Adventure = require('../models/adventure');
const adventureValidator = require('../validators/adventures')

const router = express.Router();
const upload = multer({ dest: 'uploads/photos' });

router.get('/', async (req, res) => {
  const adventures = await Adventure.find();
  res.json({ adventures: adventures })
});

router.get('/adventure-details/:id', async (req, res) => {
  const adventureId = req.params.id;
  const adventure = await Adventure.findById(adventureId);

  if (!adventure) 
    return res.status(404).send('Adventure not found');

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

router.put('/adventure/:id', upload.single('images'), adventureValidator, async (req, res) => {
  const result = validationResult(req)
  const adventureId = req.params.id;

  if (result.isEmpty()) {
    const adventure = await Adventure.findById(adventureId);
    const { country, city, date, duration, travelStyle, videos } = req.body;

    if (req.file) {
      adventure.images.push({
        originalName: req.file.originalName,
        path: req.file.path,
        size: req.file.size,
        mimeType: req.file.mimeType,
        uploadedDate: new Date()
      })
    }

    adventure.country = country;
    adventure.city = city;
    adventure.date = date;
    adventure.duration = duration;
    adventure.travelStyle = travelStyle;
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

  const adventure = await Adventure.findByIdAndDelete(adventureId);
  if (!adventureId) return res.status(404).send('Adventure not found');

  res.status(200).json({
    message: 'Adventure deleted successfully',
    deletedAdventure: adventure,
  });
});

module.exports = router;
