const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json()); // <<<<<<<<<<<<<<< to parse JSON in POST

server.get("/", (req, res) => {
  res.send("Hello web 20 node edition");
});

// The R in CRUD - READ
server.get("/users", function(req, res) {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The C in CRUD - CREATE
server.post("/users", (req, res) => {
  // axios.post(url, data) < data shows up as req.body
  const userInfo = req.body;
  console.log(userInfo);
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The D in CRUD - DELETE
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end(); // .end sends response back to client to end process
      } else {
        res.status(404).json({ message: "That user does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The U in CRUD - UPDATE
server.put("/users/:id", (req, res) => {
  const { id } = req.params; // <<< same as | const id = req.params.id
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Cannot update non-existent user" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));

// install express: npm i express
// add index.js file to the root folder
// to run it: npm run server
// to test: go to http://localhost:5000 using a client
