//Import Modules
const express = require("express");
const app = express();
const parser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./library/routes/index");
const config = require("./library/config/config");

//Connect to mongoDb
mongoose.connect(config.database,{ useNewUrlParser: true });


mongoose.connection
  .once("open", function() {
    console.log("Connection has been made, now make fireworks!");
  })
  .on("error", function(error) {
    console.log("Connection error:", error);
  });

//body-parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//For routes
app.use('/api/', route);

app.listen(7000, "localhost", () => {
  console.log(`Server is running`);
});
