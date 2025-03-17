const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authUser')
const messageController = require('../controllers/messageController')

router.post('/sendMessage', messageController.sendMessageController)
router.get('/message/:id', auth, messageController.getMessageController)
router.get('/getUserMessage/:id', messageController.getUserMessageController)

module.exports = router;