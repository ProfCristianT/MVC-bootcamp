export const index = (req, res) => {
    console.log("Hola")
    res.render("Home/index", {
        isLogin: "SI"
    })
}