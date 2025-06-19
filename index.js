const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cookieParser = require('cookie-parser');
const db = new sqlite3.Database("./database.db");
const app = express();
const port = process.env.PORT || 3000;

const createAccount = require('./routes/createAccount.js');
const login = require('./routes/login.js');
app.use(express.json());
app.use(cookieParser());

app.post('/createAccount', createAccount(db));
app.post('/login', login(db));

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.send().status(401).json({error: err.nessage || "Something went wrong"});
})

app.listen(port, (err) => {
  if(err){console.log(err);};
  console.log(`started listening on port ${port}`);  
});

