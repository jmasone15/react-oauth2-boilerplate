const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require("../../models");
const config = require("../../config/oAuthConfig");
const { getGoogleAuthURL, getTokens } = require("../../config/googleHelpers");
const dotenv = require("dotenv");
dotenv.config();

const redirectURI = "/auth";
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

router.get("/url", (req, res) => {
    return res.send(getGoogleAuthURL())
});

router.get(redirectURI, async (req, res) => {
    const code = req.query.code;

    const response = await getTokens({
        code,
        clientId: oAuthConfig.googleClientId,
        clientSecret: oAuthConfig.googleClientSecret
    });
    console.log(response);

    const googleUser = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`,
        {
            headers: {
                Authorization: `Bearer ${response.id_token}`,
            },
        }
    ).then((res) => {
        return res.data;
    }).catch((error) => {
        console.error("Failed to fetch user.");
        throw new Error(error.message);
    });

    console.log(googleUser)

    const token = jwt.sign(googleUser, oAuthConfig.jwtSecret);

    res.cookie(oAuthConfig.cookieName, token, {
        maxAge: 900000,
        httpOnly: true,
        // Should be turned on for the deployed Server.
        secure: false
    });

    res.redirect(oAuthConfig.uiRootUI);
});

module.exports = router;