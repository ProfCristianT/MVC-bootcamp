import { create } from "express-handlebars"

const hbs = create({
    extname: "hbs",
    helpers: {}
})

export default hbs