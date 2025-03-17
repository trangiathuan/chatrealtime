require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDatabase = async () => {
    try {
        const options = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD
        };

        const uri = `${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`;

        await mongoose.connect(uri, options);
        return {
            EC: 0,
            Message: "Kết nối database thành công"
        };

    } catch (error) {
        console.log('check error: ', error);
        throw new Error("Kết nối database thất bại: " + error.message);
    }
};
