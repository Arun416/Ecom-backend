
require('dotenv').config();

const express  =  require('express');

const { body, validationResult } = require('express-validator');

const mongoose = require('mongoose');

const userRoutes  = require('./routes/routes');

const cors = require('cors');

const MONGO_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: false}));

app.use('/',userRoutes)

mongoose.set('strictQuery',false);

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true
}).then(()=>{
    try{
        console.log("database connected");
        app.listen(PORT,()=>{
            console.log(`Server is running in ${PORT}`);
        })
    }
    catch(error){ console.log(error); }
})


/* app.post('/register',(req,res)=>{
    userModel.create(req.body).then(user=>{
        res.json(user)
    })
    .catch(err=>{
        res.json(err)
    })
}) */

