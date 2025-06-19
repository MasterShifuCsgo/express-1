

function login(db){
  return function (req, res){
    res.send("working");
  }
}

module.exports = login;