const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const config = require("../../config/oAuthConfig");
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

router.post("/signup", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please fill out all of the required fields.")
    }
    if (password.length < 8) {
      return res.status(400).send("Please enter a password that is at least 8 characters long.")
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).send("An account with this email already exists.")
    };

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email: email, password: passwordHash });

    const token = jwt.sign({
      userId: newUser.id
    }, oAuthConfig.jwtSecret);

    return res.cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false
    }).status(200).json(newUser);

  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }

});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please enter all required fields.")
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(401).send("Wrong email or password");
    }

    const passwordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!passwordCorrect) {
      return res.status(401).send("Wrong email or password.");
    }

    const token = jwt.sign({
      userId: existingUser.id
    }, oAuthConfig.jwtSecret);

    return res.cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false
    }).status(200).json(existingUser);

  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  return res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send();
});

router.get("/loggedin", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    return res.send(true);
  } catch (err) {
    return res.json(false);
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.params.id);
    res.json(userInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

module.exports = router;