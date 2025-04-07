import mongoose from "mongoose";

let CartSchema = mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    
    quantity:{
        type: mongoose.Schema.Types.Number,
        required: true
    },
    img:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    isAddedCart: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
    } 
})

let Cart = mongoose.model('maacho',CartSchema);

export default Cart;