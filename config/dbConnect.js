const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database has connected");
    }catch(error) {
        console.log(`Database Error ${error}`);
    }
};

module.exports = dbConnect;