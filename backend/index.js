import express from "express"
import dotenv  from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js" 
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"
import path from "path"

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret
})

const app = express()
const port = process.env.PORT || 5000

const _dirname = path.resolve()

// MIDDLEWARES
app.use(express.json())

app.use(cookieParser())

const corsOptions={
    origin: "https://mern-stack-spotify.onrender.com",  
    credentials: true
}

app.use(cors(corsOptions))



// IMPORTING ROUTES
import userRoutes from "./routes/userRoutes.js"
import songRoutes from "./routes/songRoutes.js"



// USING ROUTES
app.use("/api/user", userRoutes)
app.use("/api/song", songRoutes)




// DB CONNECTION
connectDB()


app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('/*splat', async (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

