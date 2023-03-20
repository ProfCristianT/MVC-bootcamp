import express from "express"
import multer from "multer";
import "./providers/Mongo.provider.js"
import hbs from "./config/handlebars.js";
import RoutesWeb from "./routes/web.routes.js"
import {config} from "dotenv"
config()


const app = express()

//Handlebars 
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", process.env.VIEWS_FOLDER)

//Middlewares
// View requests info
app.use((req, res, next) => {
    console.log("Method: " + req.method)
    console.log("URL: " + req.url)
    console.log("------------------------------------")

    next()
})

// Serve static files
app.use( express.static("/public") )


// req.body
app.use( express.json() ) //json
app.use( express.urlencoded({extended:true}) ) //form urlencoded
app.use( multer().none() ) //form multipart-formdata


//Router
app.use(RoutesWeb)


app.listen(process.env.APP_PORT)