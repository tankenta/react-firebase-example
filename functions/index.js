const functions = require("firebase-functions");

exports.saveUser = functions.auth.user().onCreate(async user => {
  response.send("Hello from Firebase!");
});
