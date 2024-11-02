const data_JSON = require("./data.json");
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

const PORT = 8000;

app.get("/users", (req, res) => {
  res.send(data_JSON);
});

app.get("/find", (req, res) => {
  const body = req.body;
  const id  = body.id;

  const newUser = data_JSON.filter((user) => user.id === id);
  res.send(newUser);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const filterdData = data_JSON.filter((ner) => {
    return ner.name === name;
  });
  console.log(filterdData);

  if (filterdData.length) {
    res.send({ message: "login is succesful" });
  } else {
    res.send({ message: "login is failed" });
  }
});

app.post("/signup", (req, res) => {
  const body = req.body;
  const id = body.id;
  const name = body.name;

  const currentUser = data_JSON.filter((user) => {
    return user.id === id || user.name === name;
  });

  if (currentUser.length) {
    res.send({ message: "user is allredy signed in" });
  } else {
    data_JSON.push(body);
    res.send(data_JSON);
    fs.writeFileSync("data.json", JSON.stringify(data_JSON), (error) => {
      console.log(error);
    });
    res.end;
  }
});

app.delete("/delete", (req, res) => {
  const body = req.body;
  const id = body.id;

  const newData = data_JSON.filter((user) => user.id !== id)
  fs.writeFileSync("data.json", JSON.stringify(newData), (err) => {
    console.log(err)
  })
  res.send({"message":"deleted"})
})

app.listen(PORT, console.log(`your server is running on port: ${PORT}`));
