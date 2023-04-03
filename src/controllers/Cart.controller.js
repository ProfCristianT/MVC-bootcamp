import Cart from "../models/Cart.model.js"
import Product from "../models/Product.model.js"


export const index = async (req, res) => {
    const cart = await Cart.findOne({_id: req.cookies.cartId})

    const products = await Promise.all( 
        cart.items.map( async item => {
            //findOne devuelve una instancia del modelo, pero accedo directamente a los datos que estan en _doc
            const product = ( await Product.findOne({_id: item.productId}) )._doc

            product.quantity = item.quantity
            product.subtotal = item.quantity * product.price

            return product
        } ) 
    )

    const total = products.reduce( (acc, product)=>{
        return acc + product.subtotal
    }, 0 )

    console.dir(products)
    res.render("Cart/index", {products, total})
}


export const addProduct = async (req, res) => {
    const {productId} = req.params

    //const cart = await Cart.findOne({_id: req.cookies.cartId})
    // cart.items.push( {productId} )
    // cart.save()

    //find -> si no existe lo creo, si ya existe lo actualizo la cantidad

    //Update actualizar -> si puede hacerlo termina, si no puede hacer es porque no existe entonces lo crea 

    //Aumenta la cantidad de un producto que ya esta en el array
    const result =  await Cart.updateOne(
                        {_id: req.cookies.cartId, "items.productId": productId },
                        { $inc: {"items.$.quantity": 1} }
                        //{ "items[0].quantity": 5 }
                    )
    
    //Añade un nuevo producto al array de items
    if( result.matchedCount === 0 ){
        await Cart.updateOne(
            {_id: req.cookies.cartId}, 
            {$push: { items:   {productId}    }}
        )
    }
    
    res.redirect( req.header("Referer")+`#${productId}` )
} 



export const subtractProduct = async (req, res) => {
    const {productId} = req.params
    const cart = await Cart.findOne({_id: req.cookies.cartId, "items.$.productId": productId, "items.$.quantity":{$gt: 0} })
    console.log(cart)

    //Disminuye la cantidad de un producto que ya esta en el array
    // const result =  await Cart.updateOne(
    //                     {_id: req.cookies.cartId, /*"items.quantity":{$gt: 0},*/ "items.productId": productId  },
    //                     { $inc: {"items.$.quantity": -1} }
    //                 )
    const subtractResult = await Cart.updateOne(
        { _id: req.cookies.cartId, "items.productId": productId, 'items.quantity': {$gt: 1} },
        { $inc: { "items.$.quantity": -1 } })
    
    if(subtractResult.matchedCount == 0){
        const deleteResult = await Cart.updateOne(
            { _id: req.cookies.cartId },
            { $pull:{ products: {_id: productId} } }
        )
    }
    
    res.redirect( req.header("Referer")+`#${productId}` )
} 