const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
/* 
  IMPORTANT:
    ***NEVER*** store credentials unencrypted like this.
    This is for demo purposes only in order to simulate a functioning API serverr.
*/

let cart = [];

// use this to add a 1 second delay to all requests
// app.use(function (req, res, next) {
//   setTimeout(next, 1000);
// });

app.get("/api/products", (req, res) => {
  const productsPath = path.join(__dirname, "products.json");
  fs.readFile(productsPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Failed to load products." });
      return;
    }
    try {
      const products = JSON.parse(data);
      res.send(products);
    } catch (parseErr) {
      res.status(500).send({ error: "Failed to parse products data." });
    }
  });
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

app.post("/api/register", (req, res) => {
  const usersPath = path.join(__dirname, "users.json");
  const newUser = req.body;
  if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
    res.status(400).send({ error: "All fields are required." });
    return;
  }
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Failed to load users." });
      return;
    }
    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      res.status(500).send({ error: "Failed to parse users data." });
      return;
    }
    if (users[newUser.email]) {
      res.status(409).send({ error: "User already exists." });
      return;
    }
    users[newUser.email] = newUser;
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        res.status(500).send({ error: "Failed to save user." });
        return;
      }
      res.status(201).send({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      });
    });
  });
});

/* IMPORTANT:
    The code below is for demo purposes only and does not represent good security
    practices. In a production application user credentials would be cryptographically 
    stored in a database server and the password should NEVER be stored as plain text. 
*/
app.post("/api/sign-in", (req, res) => {
  const usersPath = path.join(__dirname, "users.json");
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Failed to load users." });
      return;
    }
    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      res.status(500).send({ error: "Failed to parse users data." });
      return;
    }
    const user = users[req.body.email];
    if (user && user.password === req.body.password) {
      res.status(200).send({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(401).send("Invalid user credentials.");
    }
  });
});

app.listen(8081, () => console.log("API Server listening on port 8081!"));