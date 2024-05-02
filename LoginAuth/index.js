const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const userRoute = require("./Router/useroute");
const cors = require("cors");
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials:true
  
}))

app.use("/api", userRoute);

//Connecting to MongoDB database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

//Server listening

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running");
});
