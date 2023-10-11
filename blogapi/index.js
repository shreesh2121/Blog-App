const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./Config/db");
const app = express();
require("dotenv").config();
connectDB();

// --------------------------------------------
// For x-www-form-urlencoded(postman) it is required, otherwise it will show empty object
app.use(
  express.urlencoded({
    extended: true,
  })
);

// It is required for raw data(postman) otherwise it will show undefine
app.use(express.json());
// -------------------------------------------------

app.use('/blogapi',require("./Routes/userRoute"))
app.use('/blogapi',require("./Routes/blogRoute"))

const PORT = 7000;
app.listen(PORT, () => console.log(`Running the server at: ${PORT}`));

// _id : monogoDB in additions adds a property _id, that is uniquely indentifiable for every single entry in the database
