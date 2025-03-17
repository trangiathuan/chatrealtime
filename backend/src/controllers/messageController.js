const Message = require('../models/message');
const messageServices = require('../services/messageServices')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.sendMessageController = async (req, res) => {
    console.log('Data sent to server: ', req.body, 'Time:', new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

    const { sender, receiver, content } = req.body

    const message = new Message({
        sender,
        receiver,
        content,
        time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
    });

    const newMess = await messageServices.sendMessageService(message);

    if (newMess) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Gửi tin nhắn thành công',
            data: newMess
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Gửi tin nhắn thất bại',
            data: null
        })
    }
}

exports.getMessageController = async (req, res) => {
    const senderId = req.user._id
    const receiverId = req.params.id

    const message = await messageServices.getMessageService(senderId, receiverId);

    if (message) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Lấy tin nhắn thành công',
            data: message
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Lấy tin nhắn thất bại',
            data: null
        })
    }
}

exports.getUserMessageController = async (req, res) => {
    const id = req.params.id

    const user = await messageServices.getUserMessageService(id);

    if (user) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            data: user
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            data: null
        })
    }
}