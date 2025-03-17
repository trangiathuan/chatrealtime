const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authUser')

router.post('/createUser', userController.postCreateUserController)
router.post('/loginUser', userController.postLoginUserController)
router.post('/getInforUser', auth, userController.getInforUser)
router.get('/getListUser', auth, userController.getListUserController)

module.exports = router;