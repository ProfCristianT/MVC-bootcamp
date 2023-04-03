export function SetResRenderDafaultValues (){

    return (req, res, next)=>{
        const render = res.render
        res.render = function(view, ...args){
            if(typeof args[0] !== "function"){
                if(!args[0]){
                    args[0] = {}
                }
    
                args[0].session = req.session||false 
                // args[0].quantityProducts = req.cartData.products.reduce( (acc, product)=>{
                //         return acc + product.quantity
                //     },
                //     0
                // )
            }
            render.apply(res, [view, ...args])
        }
    
        next()
    }

}