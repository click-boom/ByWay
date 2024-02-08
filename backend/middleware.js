import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = {
      username: decoded.name,
      email: decoded.email,
    };
    next();
  });
};

router.get("/dash", verifyToken, (req, res) => {
  const { username, email } = req.user;
  res.json({
    Status: "Success",
    UserData: { username, email },
  });
});

export default router;