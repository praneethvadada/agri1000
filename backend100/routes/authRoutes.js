const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', verifyToken, authController.getProfile);
// router.get('/admin-data', verifyToken, requireRole('admin'), (req, res) => {
//   res.json({ secret: 'This is admin-only data' });
// });

router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
