// Express Router Setup
const express = require('express');
const router = express.Router();

// Import Controllers
const { getAllProducts, updateProduct, deleteProduct, createProduct, getProduct } = require('../controllers/products');

// router.get('/', getThing);
// router.post('/', createThing);
// router.post('/postman', createThing);
// router.put('/', updateThing);
// router.delete('/:id', deleteThing);

// or

// router.route('/').get((req, res) => {
//     res.send('All items')
// }).post(updateList);

// router.route('/'.get(getAllProducts));
// router.route('/postman'.post(createPostmanThing));
// router.route('/:id'.get(updateThing).delete(deleteThing));

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;