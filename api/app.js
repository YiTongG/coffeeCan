import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
const app = express();
//parse client side url
const corsOptions ={
    origin:"*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions));

app.use(express.json()); //json format
app.use(cookieParser());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log("Server is running!"); 
});
