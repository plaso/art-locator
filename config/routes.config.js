const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const artworksController = require('../controllers/artworks.controller');
const verificationsController = require('../controllers/verifications.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('./multer.config');

router.get('/', miscController.getHome);

/* Auth */

router.get('/register', authMiddleware.isUnauthenticated, authController.register);
router.post('/register', authMiddleware.isUnauthenticated, upload.single('avatar'), authController.doRegister);

router.get('/login', authMiddleware.isUnauthenticated, authController.login);
router.post('/login', authMiddleware.isUnauthenticated, authController.doLogin);

router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

router.get('/login/google', authMiddleware.isUnauthenticated, authController.loginGoogle);
router.get('/authenticate/google/cb', authMiddleware.isUnauthenticated, authController.doLoginGoogle);

/* User */

router.get('/profile', authMiddleware.isAuthenticated, usersController.profile);
router.get('/profile/:id', authMiddleware.isAuthenticated, usersController.getUserProfile);

/* Artwork */

router.get('/artworks', artworksController.list);
router.post('/artworks/create', authMiddleware.isAuthenticated, upload.single('image'), artworksController.doCreate);
router.get('/artworks/create', authMiddleware.isAuthenticated, artworksController.create);
router.get('/artworks/:id', artworksController.detail);

/* Verification */

// router.get('/artworks/:id/verifications', )
router.post('/artworks/:id/verify', authMiddleware.isAuthenticated, verificationsController.create);

module.exports = router;