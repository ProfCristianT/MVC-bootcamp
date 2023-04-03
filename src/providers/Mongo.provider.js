import mongoose from "mongoose"
import {config} from "dotenv"

config()
//mongoose.set('strictQuery', false)
mongoose.set('strictQuery', false)
 //await mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

await mongoose.connect(`mongodb+srv://Bootcamp:Bootcamp123@cluster0.17zijaj.mongodb.net/proyectos?retryWrites=true&w=majority`);
//mongodb+srv://username:<password>@cluster0.17zijaj.mongodb.net/?retryWrites=true&w=majority
