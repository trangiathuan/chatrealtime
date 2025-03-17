const User = require('../models/user');
const userServices = require('../services/userServices')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.postCreateUserController = async (req, res) => {
    const { email, password, fullName, role } = req.body;
    console.log('Data sent to server: ', req.body, 'Time:', new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const existed = await User.findOne({ email: email });

    if (existed) {
        return res.status(200).json(
            {
                EC: -1,
                Message: 'Email đã tồn tại',
                data: null
            }
        )
    }
    const userData = new User({
        email,
        password,
        fullName,
        role: role || 'user'
    })


    const user = await userServices.createUserService(userData);

    if (user) {
        return res.status(200).json(
            {
                EC: 0,
                Message: 'Đăng ký tài khoản thành công',
                data: user
            }
        )
    }
    else {
        return res.status(200).json(
            {
                EC: -1,
                Message: 'Đăng ký tài khoản thất bại',
                data: null
            }
        )
    }
}

exports.postLoginUserController = async (req, res) => {
    console.log('Data sent to server: ', req.body, 'Time:', new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const user = await userServices.loginUserService(req.body);
    if (user) {
        return res.status(200).json({
            user
        });
    }
    else {
        return res.status(200).json({
            user
        });
    }

}

exports.getInforUser = async (req, res) => {
    const user = await userServices.getInforUserService(req.user._id)
    if (user) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            data: {
                fullName: user.fullName,
                role: user.role
            }
        })
    }
    else {
        return res.status(200).json({
            EC: 0,
            Status: 'Failed',
            Message: 'Xử lý không thành công'
        })
    }
}

exports.getListUserController = async (req, res) => {
    const userId = req.user._id;

    const listUser = await userServices.getListUserService(userId)

    if (listUser) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Lấy danh sách User thành công',
            data: listUser
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Lấy danh sách User thất bại',
            data: null
        })
    }
}