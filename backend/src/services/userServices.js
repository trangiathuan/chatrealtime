const User = require('../models/user')
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.createUserService = async (user) => {
    try {
        const res = user.save();
        return res
    } catch (error) {
        console.log(error)
    }
}

exports.loginUserService = async (user) => {
    try {
        // Tìm người dùng trong cơ sở dữ liệu theo email
        const userLogin = await User.findOne({ email: user.email });

        if (!userLogin) {
            return {
                EC: -1,
                Status: 'Failed',
                Message: 'Tài khoản email chưa được đăng ký '
            };
        }
        // Kiểm tra mật khẩu
        const isMatch = await userLogin.isValidPassword(user.password);

        if (!isMatch) {
            return {
                EC: -1,
                Status: 'Failed',
                Message: 'Sai mật khẩu'
            };
        }
        const token = jwt.sign(
            {
                _id: userLogin._id,
                role: userLogin.role,
                fullName: userLogin.fullName
            },
            process.env.SecretKey,
            { expiresIn: '30d' }
        );
        // Trả về thông tin đăng nhập thành công và token
        return {
            EC: 0,
            Status: 'Success',
            Message: 'Đăng nhập thành công',
            role: userLogin.role,
            token

        };

    } catch (error) {
        console.log(error);
        return {
            EC: -1,
            Status: 'failed',
            Message: 'Có lỗi xảy ra khi xử lý yêu cầu'
        };
    }
};

exports.getInforUserService = async (infor) => {
    const user = await User.findById(infor);
    return user;
}

exports.getListUserService = async (userId) => {
    const listUser = await User.find({
        _id: { $ne: userId }
    });
    return listUser;
}
