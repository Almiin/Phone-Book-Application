const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const mysql = require("mysql");
app.use(bodyparser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "phonebookapp"
});

connection.connect();

app.get("/userAccounts", (req, res) => {
  connection.query("Select * FROM accounts", (err, rows, fields) => {
    console.log("I think we fetched accounts!");
    res.json(rows);
  });
});

app.post("/addAccount", (req, res, next) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO accounts(name, surname, email, phone, date_of_birth, address, password) VALUES ('" +
      req.body.name +
      "', '" +
      req.body.surname +
      "', '" +
      req.body.email +
      "', '" +
      req.body.phone +
      "', '" +
      req.body.date +
      "', '" +
      req.body.address +
      "', '" +
      req.body.password +
      "')",
    (err, results, fields) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.delete("/deleteAccount", function(req, res) {
  console.log(req.body);
  connection.query(
    "DELETE FROM accounts WHERE accounts_id = '" + req.body.id + "'",
    function(error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
});
app.listen(process.env.PORT || 8080);
