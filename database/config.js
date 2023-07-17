const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {
         await mongoose.connect(process.env.DB_CONN);
         console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error in database. Communicate with admin');
    }
}

module.exports = {
    dbConnection
}