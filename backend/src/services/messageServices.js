const Message = require('../models/message');
const User = require('../models/user');
exports.sendMessageService = async (mess) => {
    try {
        const message = await mess.save();
        const sender = await User.findById(message.sender)
        const receiver = await User.findById(message.receiver)
        console.log(sender.fullName, '===>', receiver.fullName, '\nMessage:', message.content);
        return message;
    } catch (error) {
        console.log("sendMessageService error: ", error);
    }
}

exports.getMessageService = async (senderId, receiverId) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ timestamp: 1 }); // Sắp xếp theo thời gian gửi
        return messages;
    } catch (error) {
        console.log(error);
    }
}

exports.getUserMessageService = async (id) => {
    try {
        const result = await User.findById(id)
        return result;
    } catch (error) {
        console.log(error);
    }
}