// Express
const server = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// APP
const app = server();

//CREATING TABLES
const { createTables } = require("./models/CreateTables");
createTables();

// ROUTER IMPORT
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users")

app.use(cors());
app.use(bodyParser.json());

// ROUTER
app.use("/", indexRouter);
app.use("/user",userRouter);



// SERVER LISTENING
app.listen(3000, () => {
    console.log("Server Started on port 3000");
}); 