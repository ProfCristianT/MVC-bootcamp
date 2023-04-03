import { Router } from "express";
import * as HomeController from "../controllers/Home.controller.js"
import * as ProductController from "../controllers/Product.controller.js"
import * as CartController from "../controllers/Cart.controller.js"
import * as UserController from "../controllers/User.controller.js"

const RoutesWeb = Router()

RoutesWeb.get("/", HomeController.index)

//PRODUCT -------------------------------------------------------
RoutesWeb.get("/product/all", ProductController.all )
RoutesWeb.get("/product/detail/:id/:name?", ProductController.detail )
RoutesWeb.get("/product/search", ProductController.querySearch )
RoutesWeb.get("/product/search/:value", ProductController.search )
RoutesWeb.get("/product/category/:category", ProductController.category )
RoutesWeb.get("/product/sale", ProductController.sale )

//CART -------------------------------------------------------
RoutesWeb.get("/cart", CartController.index )
RoutesWeb.get("/cart/addProduct/:productId", CartController.addProduct )
RoutesWeb.get("/cart/subtractProduct/:productId", CartController.subtractProduct )


//USER -------------------------------------------------------
RoutesWeb.get("/user/login", UserController.login )
RoutesWeb.get("/user/createAccount", UserController.createAccount )
RoutesWeb.get("/user/me", UserController.currentUser )

//     const ProtectedRoutes = Router()
//     ProtectedRoutes.get()
// RoutesWeb.use(middlewareEspecial, ProtectedRoutes)

export default RoutesWeb