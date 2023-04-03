import Cart from "../models/Cart.model.js"
import { config } from "dotenv"
config()

const maxAge = process.env.MAX_AGE_CART_COOKIE

const cartMiddleware = async (req, res, next) => {

    //Si NO tiene carrito
    if( !req.cookies.cartId ){
        // const cart = await Cart.create({}) 
        const cart = new Cart
        await cart.save()
        res.cookie('cartId',cart._id.toString(), { maxAge: maxAge , httpOnly: true })     
    }
    //Si YA tiene carrito
    else{
        res.cookie('cartId',req.cookies.cartId, { maxAge: maxAge, httpOnly: true })     
    }
    next()
}

export default cartMiddleware