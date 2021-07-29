const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
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

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
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


  router.post('/', (req, res) => {
    // create a new category
    Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    })
      .then((newProduct) => {
        // Send the newly created row as a JSON object
        res.json(newProduct);
      })
      .catch((err) => {
        res.json(err);
      });
  });


// update product
router.put('/:id', (req, res) => {
  // update product data

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
  // delete one product by its `id` value
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
