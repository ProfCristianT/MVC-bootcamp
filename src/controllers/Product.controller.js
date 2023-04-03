import Cart from "../models/Cart.model.js"
import Product from "../models/Product.model.js"

const inCart = async (products, cartId)=>{
    if( !Array.isArray(products) ){
        products = [products]
    }
    //busco el carrito
    const cart = await Cart.findOne({_id: cartId})

    //mapeo los productos, si se encuentran en el carrito les agrego inCart=true y quantity igual que en el carrito
    const newProducts = products.map( product => {
        //Obtengo el raw data del product model o si se trata ya de un raw lo utilizo asi
        // const productInfo = product._doc || product
        // const productData = {...productInfo}
        const productData = product._doc || product

        //Busco el producto en el carrito
        const productInCart = cart.items?.find(item => item.productId.toString() === productData._id.toString())

        productData.inCart = !!productInCart // {}->true    undefined->false
        productData.quantity = productInCart?.quantity

        return productData
    } )

    return newProducts
}

export const all = async (req, res) => {
    try {
        const products = await Product.find()
        //const productsModifiedInCart = await inCart(products, req.cookies.cartId)
        await inCart(products, req.cookies.cartId)

        //console.log(productsModifiedInCart)
        // const productos = products.map( product => product._doc )
        // console.dir(products[0])
        // console.dir(productos[0])
        res.render("Product/viewMany", { 
            products,
            sectionTitle: "Todos",
            title: "Todos nuestros productos"
        })

    } catch (error) {
        
    }
}


export const detail = async (req, res) => {
    const _id = req.params.id

    try {
        const product = await Product.findOne({_id})
        await inCart(product, req.cookies.cartId) 
        res.render("Product/viewOne", {
            product
        })
    } catch (error) {
        
    }
}


export const querySearch = (req, res) => {
    const query = req.query.q

    res.redirect("/product/search/"+query)
}


export const search = async (req, res) => {
    const {value} = req.params 
    const regExp = new RegExp(value, "i")
    try {
        const products = await Product.find( {$or: [
                                    {brand: regExp},
                                    {model: regExp},
                                    {category: regExp}
                                ]} )
        await inCart(products, req.cookies.cartId) 
        res.render("Product/viewMany",{
            products,
            title: "Busqueda: "+value,
            sectionTitle: `Busqueda: "${value}"`,
            searchValue: value
        })
    } catch (error) {
        
    }
}



export const category = async (req, res) => {
    const {category} = req.params
    const regExp = new RegExp(category, "i")
    try {
        const products = await Product.find({category: regExp})
        await inCart(products, req.cookies.cartId)
        res.render("Product/viewMany", {
            products,
            title: category,
            sectionTitle: "Category: "+category
        })
    } catch (error) {
        
    }
}


export const sale = async (req, res) => {
    try {
        const products = await Product.find({sale:true})
        await inCart(products, req.cookies.cartId)
        res.render("Product/viewMany", {
            products,
            title: "Sale",
            sectionTitle: "Sale"
        })
    } catch (error) {
        
    }
}





// class Product{
//     static index(req, res){
//         res.send("PRODUCT")
//     }

//     static viewOne(req, res){
//         res.send("PRODUCT  VIEW ONE")

//     }

//     static viewAll(req, res){
//         res.send("PRODUCT VIEW ALL")

//     }
// }

// export default Product


