let mongoose = require('mongoose');  // install and import mongoose

let connection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected");
        console.log("Connected Database:", mongoose.connection.name);
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports = connection   //exporting