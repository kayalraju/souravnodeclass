const mongoose = require('mongoose');


async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connect to db');
    } catch (error) {
        console.log(error);
    }

}

module.exports = connectDb;