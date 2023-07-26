const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const artworksController = require('../controllers/artworks.controller');

router.get('/', miscController.getHome);

/* Auth */

router.get('/register', authController.register);
router.post('/register', authController.doRegister);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/logout', authController.logout);

router.get('/login/google', authController.loginGoogle);
router.get('/authenticate/google/cb', authController.doLoginGoogle);

/* User */

router.get('/profile', usersController.profile);

/* Artwork */

router.get('/artworks', artworksController.list);
router.post('/artworks/create', artworksController.doCreate);
router.get('/artworks/create', artworksController.create);
router.get('/artworks/:id', artworksController.detail);

module.exports = router;