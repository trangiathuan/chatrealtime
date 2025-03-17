const mongoose = require('mongoose');
const moment = require('moment-timezone');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: () => {
            // Lấy thời gian hiện tại theo giờ Việt Nam
            const vietnamTime = moment.tz('Asia/Ho_Chi_Minh');

            // Chuyển thời gian từ giờ Việt Nam (UTC+7) sang UTC (UTC-0) bằng cách trừ 7 giờ
            return vietnamTime.subtract(7, 'hours').toDate(); // Trả về thời gian ở UTC
        }
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
