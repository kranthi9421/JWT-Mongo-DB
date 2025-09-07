import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import StudentModel from "./models/Student.js"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
)

app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/school")

app.post("/register", (req, res) => {
  const { name, email, password } = req.body
  StudentModel.create({ name, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
})

app.post("/login", (req, res) => {
  const { email, password } = req.body
  StudentModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign(
            { email: email },
            "jwt-access-token-secret-key",
            { expiresIn: "1m" }
          )
          const refreshToken = jwt.sign(
            { email: email },
            "jwt-refresh-token-secret-key",
            { expiresIn: "5m" }
          )
          res.cookie("accessToken", accessToken, { maxAge: 60000 })
          res.cookie("refreshToken", refreshToken, {
            maxAge: 300000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          res.json({ Login: true, email})
        }
      } else {
        res.json({ Login: false, Message: "No Record" })
      }
    })
    .catch((err) => res.json(err))
})

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
      if (err) return res.json({ valid: false, message: "Access token expired" });

      req.email = decoded.email;
      next();
    });
  } else {
    renewToken(req, res, next);
  }
};

const renewToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.json({ valid: false, message: "No refresh token" });

  jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
    if (err) return res.json({ valid: false, message: "Refresh token expired" });

    const newAccessToken = jwt.sign(
      { email: decoded.email },
      "jwt-access-token-secret-key",
      { expiresIn: "1m" }
    );

    res.cookie("accessToken", newAccessToken, { maxAge: 60000 });
    req.email = decoded.email;
    next();
  });
};


app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ valid: true, message: "autorized" })
})

app.listen(3001, () => {
  console.log("server is running")
})
