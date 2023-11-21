// Express
const server = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();


// APP
const app = server();

//CREATING TABLES
const { createTables } = require("./models/CreateTables");
createTables();

// ROUTER IMPORT
const indexRouter = require("./routes/index.routes")
const userRouter = require("./routes/users.routes")
const activityRouter = require("./routes/activities.routes")
const performanceRouter = require("./routes/performance.routes")
const communityRouter = require("./routes/community.routes")
const requestRouter = require("./routes/requests.routes")
const swaggerRouter = require("./routes/swagger.routes")

app.use(cors());
app.use(bodyParser.json());

// ROUTER
app.use("/", indexRouter);
app.use("/api-docs",swaggerRouter)
app.use("/user", userRouter);
app.use("/activity", activityRouter)
app.use("/performance", performanceRouter)
app.use("/community", communityRouter)
app.use("/request", requestRouter)



// SERVER LISTENING
app.listen(process.env.PORT, () => {
    console.log("Server Started on port 3000");
}); 