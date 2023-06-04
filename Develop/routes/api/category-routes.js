const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(catRoute => {
    if(!catRoute){
      res.status(404).json({message: "Category could not be found"});
      return;
    }
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.param.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(catRoute => {
    if(!catRoute){
      res.status(404).json({message: "Could not find category"})
      return
    }
    res.json(catRoute)
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json(error)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(catRoute => res.json(catRoute))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
  })


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(catRoute =>{
    if(!catRoute){
      res.status(404).json({message: "Could not update this specific category"})
      return
    }
    res.json(catRoute);
  })
  .catch(err =>{
    console.log(error)
    res.status(500).json(error)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catRoute => {
    if(!catRoute){
      res.status(404).json({message: "Could not delete this category"})
      return;
    }
    res.json(catRoute)
  })
  .catch(error=> {
    console.log(error)
    res.status(500).json(error)
  })
});

module.exports = router;
