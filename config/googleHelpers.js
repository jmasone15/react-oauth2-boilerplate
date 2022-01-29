const config = require("./oAuthConfig");
const querystring = require("querystring");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

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

module.exports = {
  // Generate the URL where the user will sign in with google.
  getGoogleAuthURL: function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectURI = "/api/google/auth"

    const options = {
      redirect_uri: `${oAuthConfig.serverRootUI}${redirectURI}`,
      client_id: oAuthConfig.googleClientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`
  },
  getTokens: function getTokens({ code, clientId, clientSecret }) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${oAuthConfig.serverRootUI}/api/google/auth`,
      grant_type: "authorization_code"
    };

    return axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      return res.data;
    }).catch((error) => {
      console.log("Failed to fetch auth tokens");
      throw new Error(error.message);
    })
  }
}