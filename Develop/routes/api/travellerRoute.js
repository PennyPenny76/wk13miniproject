const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Traveller, Location, Trip } = require('../../models');

// GET all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll();
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a travellers
router.post('/', async (req, res) => {
    try {
      const travellerData = await Traveller.create(req.body);
      res.status(200).json(travellerData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// GET one travellers with their associated trips and a list of locations
router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
         include: [{ model: Location, through: Trip, as: 'planned_trips' }],
        });

        if (!travellerData) {
             res.status(404).json({ message: 'No traveller with this id!' });
             return;
        }

        res.status(200).json(travellerData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE a traveller
router.delete('/:id', async (req, res) => {
    try {
      const travellerData = await Traveller.destroy({
        where: {
          id: req.params.id,},
      });
  
      if (!travellerData) {
        res.status(404).json({ message: 'No traveller found with that id!' });
        return;
      }
  
      res.status(200).json(travellerData);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;
