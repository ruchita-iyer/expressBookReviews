const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ "username": "ibm", "password": "ibm123"}];
//let users = [];

const isValid = (username) => { //returns boolean
  let isUsernameValid = false
  users.map(user => {
    if (user.username == username) {
      isUsernameValid = true
    }
  })
  return isUsernameValid
}

const authenticatedUser = (username, password) => { //returns boolean
  let isUserValid = false
  users.map(user => {
    if (user.username == username && user.password == password) {
      isUserValid = true
    }
  })
  return isUserValid
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body
  let isUserAuthorized = authenticatedUser(username, password)
  let message = ""
  if (isUserAuthorized)
    message = "User login success!"
  else
    message = "User login failed!"
  return res.status(300).json({ message: message });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params
  const { review } = req.query
  const book = books[isbn]
  book.reviews = { review: review }
  return res.status(300).json({ message: "Review updated" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;