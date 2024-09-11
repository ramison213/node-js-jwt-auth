const router = require('express').Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { body } = require('express-validator');

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min:3, max:16}),
    userController.register
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post('/refresh', userController.refresh);
router.get('/users',
    authMiddleware,
    userController.getUsers
);

module.exports = { router };