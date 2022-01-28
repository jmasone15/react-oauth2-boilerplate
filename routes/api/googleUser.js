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


    try {
        const existingUser = await User.findOne({ where: { email: googleUser.email } });

        if (existingUser) {
            const correctId = await bcrypt.compare(googleUser.id, existingUser.password);
            if (!correctId) {
                return res.status(400).send("Something went wrong with oAuth2.0").redirect(oAuthConfig.uiRootUI);
            }

            const token = jwt.sign({
                userId: existingUser.id
            }, oAuthConfig.jwtSecret);

            res.cookie("token", token, {
                maxAge: 900000,
                httpOnly: false,
                secure: false
            }).status(200);

            return res.redirect(oAuthConfig.uiRootUI);

        } else {
            const salt = await bcrypt.genSalt();
            const googleIdHash = await bcrypt.hash(googleUser.id, salt);

            const newUser = await User.create({
                first_name: googleUser.given_name,
                last_name: googleUser.family_name,
                googlePicture: googleUser.picture,
                email: googleUser.email,
                password: googleIdHash,
                isGoogle: true
            });

            const token = jwt.sign({
                userId: newUser.id
            }, oAuthConfig.jwtSecret);

            res.cookie("token", token, {
                maxAge: 900000,
                httpOnly: false,
                secure: false
            }).status(200);

            return res.redirect(oAuthConfig.uiRootUI);

        }
    } catch (err) {
        console.error(err);
        return res.status(500).redirect(oAuthConfig.uiRootUI);
    }
});

module.exports = router;