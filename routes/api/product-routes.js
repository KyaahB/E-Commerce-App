const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  
    try {
      Product.findAll({
        include: [{ model: Category }, {model: Tag}],
      })
      .then((productData) => {

        res.status(200).json(productData);
      })
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category },{model: Tag}],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  //   })
  router.post('/', (req, res) => {
    Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    })
      .then((newProduct) => {
        res.json(newProduct);
      })
      .catch((err) => {
        res.json(err);
      });
  });



router.put('/:id', (req, res) => {

  Product.update(
    {
      product_name: req.body.product_name, 
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => res.json(err));
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!deletedProduct) {
      res.status(404).json({message: 'Product deleted!'});
      return;
    }
  
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  });



module.exports = router;
