const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.uj88g.mongodb.net/BlogSpotDB?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("DB Connection successfull");
}).catch((error)=>{
    console.log("Connection failed.", error.message);
});


module.exports = mongoose;