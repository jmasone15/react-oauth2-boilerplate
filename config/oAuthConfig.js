const dotenv = require("dotenv");
dotenv.config();

const config = {
    development: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        serverRootUI: "http://localhost:3001",
        uiRootUI: "http://localhost:3000",
        jwtSecret: process.env.JWT_SECRET,
        cookieName: "auth_token"
    },
    test: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        serverRootUI: "<test server location here>",
        uiRootUI: "<test website location here>",
        jwtSecret: process.env.JWT_SECRET,
        cookieName: "auth_token"
    },
    production: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        serverRootUI: "<prod server location here>",
        uiRootUI: "<prod website location here>",
        jwtSecret: process.env.JWT_SECRET,
        cookieName: "auth_token"
    }
}

module.exports = config;