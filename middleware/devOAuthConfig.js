import dotenv from "dotenv";
dotenv.config();

const oAuthConfig = {
    dev: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        serverRootUI: "http://localhost:3001",
        uiRootUI: "http://localhost:3000",
        jwtSecret: "VsxSQyW?yQCJ?esT59*Vgur7SCPEHtGK-Fdf!vD&$%&tF@?T#=",
        cookieName: "auth_token"
    },
    test: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        serverRootUI: "<test server location here>",
        uiRootUI: "<test website location here>",
        jwtSecret: "VsxSQyW?yQCJ?esT59*Vgur7SCPEHtGK-Fdf!vD&$%&tF@?T#=",
        cookieName: "auth_token"
    },
    prod: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        serverRootUI: "<prod server location here>",
        uiRootUI: "<prod website location here>",
        jwtSecret: "VsxSQyW?yQCJ?esT59*Vgur7SCPEHtGK-Fdf!vD&$%&tF@?T#=",
        cookieName: "auth_token"
    }
}

export default oAuthConfig;