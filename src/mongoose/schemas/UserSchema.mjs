import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    firstname:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    lastName: mongoose.Schema.Types.String,
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique:true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    phone: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
   
})

export let User = mongoose.model('User',UserSchema);