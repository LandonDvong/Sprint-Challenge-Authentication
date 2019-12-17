const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");


const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = genToken(saved);
      res.status(201).json({ created_user: saved, token: token });
    })
    .catch(error => {
      var response = {
        success: false,
        message: "An error has occurred. Please try again"
      };

      console.error(error);

      res.status(500).json(response);
    });
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const User = await users.findBy({ username });

    if (User && bcrypt.compareSync(password, User.password)) {
      const token = genToken(User);
      res.status(200).json({ message: `Welcome, ${username}!`, token: token });
    } else {
      res.status(401).json({ message: "Invalid Creds" });
    }
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;