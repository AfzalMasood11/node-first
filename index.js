const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/authRoute");

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use('/', (req, res) => {
//     res.send("Hi, Its my first NodeJs project.");
// });

app.use('/api/user', authRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running at Port: ${PORT}`);
});