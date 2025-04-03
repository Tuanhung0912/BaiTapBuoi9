var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(
    {
      message:"heheeheheh"
    }
  );
});

router.get('/slug/:categorySlug', async function(req, res, next) {
  try {
      let category = await categoryModel.findOne({ slug: req.params.categorySlug });

      if (!category) {
          return res.status(404).send({
              success: false,
              message: 'Category not found'
          });
      }

      let products = await productModel.find({ category: category._id, isDeleted: false });

      res.status(200).send({
          success: true,
          data: products
      });
  } catch (error) {
      res.status(500).send({
          success: false,
          message: error.message
      });
  }
});

router.get('/slug/:categorySlug/:productSlug', async function(req, res, next) {
  try {
      let category = await categoryModel.findOne({ slug: req.params.categorySlug });

      if (!category) {
          return res.status(404).send({
              success: false,
              message: 'Category not found'
          });
      }

      let product = await productModel.findOne({ 
          slug: req.params.productSlug, 
          category: category._id,
          isDeleted: false 
      });

      if (!product) {
          return res.status(404).send({
              success: false,
              message: 'Product not found'
          });
      }

      res.status(200).send({
          success: true,
          data: product
      });
  } catch (error) {
      res.status(500).send({
          success: false,
          message: error.message
      });
  }
});

module.exports = router;