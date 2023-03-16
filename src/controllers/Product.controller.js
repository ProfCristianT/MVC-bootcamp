class Product{
    index(req, res){
        res.send("PRODUCT")
    }

    viewOne(req, res){
        res.send("PRODUCT  VIEW ONE")

    }

    viewAll(req, res){
        res.send("PRODUCT VIEW ALL")

    }
}

export default Product
