const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true
    }
    
})

const Userdb = mongoose.model('userdb',schema);
module.exports=Userdb;