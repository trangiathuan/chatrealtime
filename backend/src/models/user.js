const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew && this.isModified('password')) {  // Chỉ băm khi là người dùng mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err);
    }
});

// Hàm kiểm tra mật khẩu
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;