import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { Request, Response, Next } from "express";

//Configuring the dotenv
dotenv.config();

const app = express();

app.use(express.json());

const posts = [
  { userName: "Tony", title: "Post 1" },
  { userName: "Alice", title: "Post 2" },
  { userName: "John", title: "Post 3" },
];

app.get("/", (_req, res) => {
  res.json(posts);
});

app.post("/login", authenticateToken, (req, res) => {
  //Authenticate The User
  const userName = req.body.userName;
  const user = { name: userName };
  //Next we want To Serialize and authenticate This User With Json web tokens
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

//Creating a MiddleWare  To Authenticate The Token
function authenticateToken(req, res, next) {
  //Inside The function we want to verify The Token That They Send Us, Verify That This Is The Correct User
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
app.listen(3000);
