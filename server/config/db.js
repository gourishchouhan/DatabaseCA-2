const mongoose = require(mongoose);
const connectDB = async () => {
    try{
        await mongoose.connect(processe.env.MONGO_URI)
        console.log("MongoDB connected!")
    }catch(message){
        console.error({message:"MongoDB not connected!"})
    }
};
module.exports = connectDB;