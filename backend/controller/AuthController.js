import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

import connectToDatabase from "../db.js";
import Admin from "../model/AdminModel.js";
const router = express.Router();
router.use(cookieParser());
const salt = 10;

let db;
(async function () {
  try {
    db = await connectToDatabase();
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
})();
dotenv.config();

//Login API call
const loginUser = async (user) => {
  const loginQuery = "SELECT * FROM Admins WHERE email= ?";

  return new Promise((resolve, reject) => {
    db.query(loginQuery, [user.getEmail()], (err, data) => {
      if (err) {
        reject({ Error: "Login error in server" });
      }

      if (data.length > 0) {
        bcrypt.compare(
          user.getPassword().toString(),
          data[0].password,
          (err, response) => {
            if (err) {
              reject({ Error: "Password Compare error" });
            }

            if (response) {
              const name = data[0].username;

              // Create a JWT token
              const token = jwt.sign(
                { name, email: user.getEmail() },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1d",
                }
              );

              // Attach the token to the response for the client to store
              resolve({
                Status: "Success",
                UserData: { name, email: user.getEmail() },
                Token: token,
              });
            } else {
              reject({ Error: "Password doesn't match" });
            }
          }
        );
      } else {
        reject({ Error: "Admin doesn't exist" });
      }
    });
  });
};

// Controller endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = new Admin(email, password);

  try {
    const response = await loginUser(user);

    // Securely store the token in an HttpOnly cookie
    res.cookie("token", response.Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

const registerUser = async (user) => {
  const checkUserQueryByEmail = "SELECT * FROM Admins WHERE email = ?";
  const checkUserQueryByUsername = "SELECT * FROM Admins WHERE username = ?";

  return new Promise((resolve, reject) => {
    // Check if the user already exists by email
    db.query(
      checkUserQueryByEmail,
      [user.getEmail()],
      (errEmail, dataEmail) => {
        if (errEmail) {
          reject({ Error: "Database error" });
        }

        db.query(
          checkUserQueryByUsername,
          [user.getUsername()],
          (errUsername, dataUsername) => {
            if (errUsername) {
              reject({ Error: "Database error" });
            }

            if (dataEmail.length > 0 || dataUsername.length > 0) {
              // User with the given email or username already exists
              reject({
                Error: "User with this email or username already exists",
              });
            } else {
              // User doesn't exist, proceed with registration
              bcrypt.hash(
                user.getPassword().toString(),
                salt,
                (hashErr, hash) => {
                  if (hashErr) {
                    reject({ Error: "Hashing error" });
                  }

                  const registerQuery =
                    "INSERT INTO Admins (`username`, `email`, `password`) VALUES (?, ?, ?)";
                  const values = [user.getUsername(), user.getEmail(), hash];

                  // Insert new user into the database
                  db.query(registerQuery, values, (insertErr) => {
                    if (insertErr) {
                      console.log("Insertion error:", insertErr);
                      reject({ Error: "Insertion error" });
                    } else {
                      // Registration successful
                      resolve({ Status: "Success" });
                    }
                  });
                }
              );
            }
          }
        );
      }
    );
  });
};

// Controller endpoint for registration
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  const user = new Admin(email, password, username);

  try {
    // Register the user
    const registrationResponse = await registerUser(user);

    // You can modify the response format as needed
    res.json(registrationResponse);
  } catch (error) {
    console.error("An error occurred during registration:", error);
    res.json(error);
  }
});

router.get('/logout', (req, res) =>{
  res.clearCookie('token');
  return res.json({Status: "Success"})
})

export default router;
