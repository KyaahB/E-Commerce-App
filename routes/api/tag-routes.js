const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint


  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    
  })
    .then((newTag) => {
      // Send the newly created row as a JSON object
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id, 
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!deletedTag) {
      res.status(404).json({message: 'Tag deleted!'});
      return;
    }
  
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
  });



module.exports = router; 

