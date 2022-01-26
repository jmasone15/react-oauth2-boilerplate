// Dependencies
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const config = require("./config/oAuthConfig");
const sequelize = require("./config/dbConfig");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// OAuth Config setup based on evironment
let oAuthConfig = {};
switch (process.env.NODE_ENV) {
    case "development":
        oAuthConfig = config.development
        break;
    case "test":
        oAuthConfig = config.test
        break;
    default:
        oAuthConfig = config.production
        break;
};

// Middleware 
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser()); 
app.use(morgan("tiny"));
app.use(
    cors({
        // Sets Access-Control-Allow-Origin to the UI URI
        origin: oAuthConfig.uiRootUI,
        // Sets Access-Control-Allow-Credentials to true
        credentials: true,
    })
);
app.use(routes);

// Start Server
app.listen(PORT, () => {
    console.log(`🌎 Server Listening at: http://localhost:${PORT} 🌎`);
    sequelize.sync({ force: false });
});