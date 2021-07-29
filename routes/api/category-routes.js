const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ 
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ 
        model: Product
      }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  
  Category.create({
    category_name: req.body.category_name
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      name: req.body.name, 
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  try {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!deletedCategory) {
    res.status(404).json({message: 'Category deleted!'});
    return;
  }

  res.status(200).json(deletedCategory);
} catch (err) {
  res.status(500).json(err);
}
});



module.exports = router;
