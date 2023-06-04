const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(tagRoute => res.json(tagRoute))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(tagRoute => res.json(tagRoute))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagRoute => res.json(tagRoute))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where: {
      ide: req.params.id
    }
  })
  .then(tagRoute => {
    if(!tagRoute){
      res.status(404).json({message: "Tag not found"})
      return;
    }
    
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagRoute => {
    if(!tagRoute){
      res.status(404).json({message: "Tag not found"})
      return;
    }
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json(error)
  })
});

module.exports = router;
