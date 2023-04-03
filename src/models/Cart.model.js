import mongoose, {ObjectId} from "mongoose"

const schema = new mongoose.Schema({
    items: [{
        productId: {type: ObjectId, required: true/*, unique: true*/},
        quantity: {type: Number, default: 1, min:0 }
    }],
    
    userId: ObjectId,

    state: {type: String, default: "activo", enum:[ "activo", "inactivo", "terminado" ]},

    total: Number
})


const Cart = mongoose.model( "Cart", schema )

export default Cart