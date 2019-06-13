const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const mysql = require("mysql");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const jwt_secret = "WU5CjF8fHxG40S2t7oyk";

app.use(bodyparser.json());

const connection = mysql.createConnection({
  host: "ibu-db-server.adnan.dev",
  user: "almin-p",
  password: "YKX9r7kr",
  database: "db_almin_p"
});

connection.connect();

app.use(express.static(path.join(__dirname, "/client/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "/client/build/index.html")));
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/userAccounts", (req, res) => {
  var token = req.headers["jwt"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, jwt_secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    connection.query("Select * FROM accounts", (err, rows, fields) => {
      console.log("I think we fetched accounts!");
      res.json(rows);
    });
  });
});

app.get("/persons", (req, res) => {
  connection.query("Select * FROM natural_persons", (err, rows, fields) => {
    console.log("I think we fetched persons!");
    res.json(rows);
  });
});

app.get("/entities", (req, res) => {
  connection.query("Select * FROM legal_entities", (err, rows, fields) => {
    console.log("I think we fetched persons!");
    res.json(rows);
  });
});

app.post("/addAccount", (req, res, next) => {
  var msg = [];
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  if (
    req.body.name == "" ||
    req.body.surname == "" ||
    req.body.email == "" ||
    req.body.phone == "" ||
    req.body.address == "" ||
    hashedPassword == "" ||
    req.body.type == ""
  ) {
    msg = "empty";
  } else {
    connection.query(
      "INSERT INTO accounts(name, surname, email, phone, date_of_birth, address, password, type) VALUES ('" +
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
        hashedPassword +
        "', '" +
        req.body.type.toLowerCase() +
        "')",
      function(err, results, fields) {
        if (err) throw err;
      }
    );
    msg = "added";
  }
  res.json(msg);
});

app.post("/addPerson", (req, res, next) => {
  var msg = [];
  if (
    req.body.name == "" ||
    req.body.surname == "" ||
    req.body.email == "" ||
    req.body.phone == "" ||
    req.body.address == ""
  ) {
    msg = "empty";
  } else {
    connection.query(
      "INSERT INTO natural_persons(name, surname, email, phone, date_of_birth, address) VALUES ('" +
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
        "')",
      function(err, results, fields) {
        if (err) throw err;
      }
    );
    msg = "added";
  }
  res.json(msg);
});

app.post("/addEntity", (req, res, next) => {
  var msg = [];
  if (
    req.body.name == "" ||
    req.body.email == "" ||
    req.body.phone == "" ||
    req.body.address == "" ||
    req.body.business == "" ||
    req.body.description == "" ||
    req.body.jib == "" ||
    req.body.city == "" ||
    req.body.type_of_legal_entity == ""
  ) {
    msg = "empty";
  } else {
    connection.query(
      "INSERT INTO legal_entities(name, email, phone, address, business, description, jib, city, type_of_legal_entity) VALUES ('" +
        req.body.name +
        "', '" +
        req.body.email +
        "', '" +
        req.body.phone +
        "', '" +
        req.body.address +
        "', '" +
        req.body.business +
        "', '" +
        req.body.description +
        "', '" +
        req.body.jib +
        "', '" +
        req.body.city +
        "', '" +
        req.body.type_of_legal_entity +
        "')",
      function(err, results, fields) {
        if (err) throw err;
      }
    );
    msg = "added";
  }
  res.json(msg);
});

app.delete("/deleteAccount", function(req, res) {
  console.log(req.body.id);
  connection.query(
    "DELETE FROM accounts WHERE accounts_id = '" + req.body.id + "'",
    function(error, results, fields) {
      if (error) throw error;
      res.json("deleted");
    }
  );
});

app.delete("/deletePerson", function(req, res) {
  console.log(req.body.id);
  connection.query(
    "DELETE FROM natural_persons WHERE person_id = '" + req.body.id + "'",
    function(error, results, fields) {
      if (error) throw error;
      res.json("deleted");
    }
  );
});

app.delete("/deleteEntity", function(req, res) {
  console.log(req.body.id);
  connection.query(
    "DELETE FROM legal_entities WHERE entity_id = '" + req.body.id + "'",
    function(error, results, fields) {
      if (error) throw error;
      res.json("deleted");
    }
  );
});

app.put("/updateAccount", function(req, res) {
  console.log(req.body.account);
  connection.query(
    "UPDATE accounts SET name = '" +
      req.body.name +
      "', surname = '" +
      req.body.surname +
      "', email = '" +
      req.body.email +
      "', phone = '" +
      req.body.phone +
      "', type = '" +
      req.body.type +
      "', address = '" +
      req.body.address +
      "' WHERE accounts_id = '" +
      req.body.account +
      "'",
    function(error, results, fields) {
      if (error) throw error;
      res.json("deleted");
    }
  );
});

app.put("/updateEntity", function(req, res) {
  console.log(req.body.entity_id);
  connection.query(
    "UPDATE legal_entities SET name = '" +
      req.body.name +
      "', email = '" +
      req.body.email +
      "', phone = '" +
      req.body.phone +
      "', address = '" +
      req.body.address +
      "', business = '" +
      req.body.business +
      "' , description = '" +
      req.body.description +
      "' , jib = '" +
      req.body.jib +
      "' , city = '" +
      req.body.city +
      "' , type_of_legal_entity = '" +
      req.body.type_of_legal_entity +
      "' WHERE entity_id = '" +
      req.body.entity_id +
      "'",
    function(error, results, fields) {
      if (error) throw error;
      res.json("deleted");
    }
  );
});

app.post("/login", (req, res) => {
  var msg = [];
  var haha = [];
  if (req.body.email == "" || req.body.password == "") {
    empty = "empty";
  } else {
    connection.query(
      "Select * FROM accounts WHERE email = '" + req.body.email + "'",
      (err, rows, fields) => {
        if (rows.length == 1 && rows[0].type == "admin") {
          bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
            if (result == true) {
              var token = jwt.sign(
                {
                  id: rows[0].accounts_id,
                  name: rows[0].name,
                  surname: rows[0].surname,
                  email: rows[0].email
                },
                jwt_secret,
                {
                  expiresIn: 86400
                }
              );

              res.status(200).json({
                message: "Authenticated",
                token: token
              });
            } else {
              msg = "incorrectPass";
              res.json(msg);
            }
          });
        } else {
          haha = "notExists";
          res.json(haha);
        }
      }
    );
  }
});

app.put("/updatePerson", function(req, res) {
  console.log(req.body.person);
  connection.query(
    "UPDATE natural_persons SET name = '" +
      req.body.name +
      "', surname = '" +
      req.body.surname +
      "', email = '" +
      req.body.email +
      "', phone = '" +
      req.body.phone +
      "', address = '" +
      req.body.address +
      "' WHERE person_id = '" +
      req.body.person +
      "'",
    function(error, results, fields) {
      if (error) throw error;
      res.json("deleted");
    }
  );
});
app.listen(process.env.PORT || 8080);
