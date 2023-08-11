const {Router}  =  require('express');
const authorize = require('../middlewares/auth');

const {signUp,login,getUsers,updateProfile} = require('../controllers/userControllers')

const {createProduct,getProducts,getProduct,updateProduct,deleteProduct,searchProducts} = require('../controllers/productControllers');

const {addCartProduct,viewCart} = require('../controllers/cartControllers');

const { body, validationResult } = require('express-validator');

const authenticateToken = require('../verifyToken'); // Import your authentication middleware


const router =  Router();


router.post('/signup', [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    // Add more validation rules for other fields
  ], signUp);

router.post('/login',login);

router.get('/user',getUsers)

router.patch('/user/:id/profile',updateProfile)

router.get('/product',authorize(),getProducts)

router.post('/product',authorize(['seller']),createProduct)

router.get('/product/:id',authorize(),getProduct)

router.patch('/product/:id',authorize(['seller']),updateProduct)

router.delete('/product/:id',authorize(['seller']), deleteProduct)

router.get('/search-product',authorize(),searchProducts);

router.post('/add-to-cart/:productId',authorize(['user']),addCartProduct)

router.get('/cart',authorize(['user']),viewCart)

// router.get('/trend-products',getProducts)

module.exports = router;