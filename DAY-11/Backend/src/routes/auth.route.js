const {Router} = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const authUser = require('../middleware/auth.middleware');

const router = Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/get-me',authUser);


module.exports = router;


