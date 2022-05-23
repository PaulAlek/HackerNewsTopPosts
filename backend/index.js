const express = require("express");
const app = express();
const cron = require('node-cron');
const cors = require("cors");
const  getTopTenController  = require("./controllers/getTopTenController");
const hackerApiConnect = require("./hackerApiConnect");

const PORT = process.env.PORT || 4000;
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

const db = require("./models/index");
const getCommentController = require("./controllers/getCommentController");
db.sequelize.sync({ force: true });

//Every minute "* * * * *" 
//Every Hour "0 * * * *""
cron.schedule("0 * * * *", function() {
    console.log("Running a task every minute");
    hackerApiConnect();
  });

app.get("/:id", getCommentController);
app.get("/", getTopTenController);

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`)
    hackerApiConnect();
});