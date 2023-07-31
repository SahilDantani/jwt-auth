const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const dotenv =require("dotenv").config();



module.exports.checkUser = (req, res, next) => {
  
  const key = process.env.SECRET_KEY;
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      key,
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
