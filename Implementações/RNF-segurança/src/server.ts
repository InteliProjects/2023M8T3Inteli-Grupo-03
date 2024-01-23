import express from "express"
import cors from "cors"

import routerUser from "./router/user.router"
import routerAuth from "./router/auth.router"

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/user",routerUser)
app.use("/auth",routerAuth)

if (require.main === module) {
    //inicia o servidor
    app.listen(port)
    console.log("Server is running on port 3000")
}

export default app;