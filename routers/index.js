const router = require('express').Router();

router.post('/register');
router.post('/login');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');
router.get('/users');

module.exports = { router };