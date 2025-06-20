

function login(db){
  return function (req, res){

    //check if user credentials are valid.
     //has password, email and username
    db.get("Select * from users where username = ")


    //check if user credentials match what is in the database
     //if username/email and password match, send the auth.

    


    res.send("working");
  }
}

module.exports = login;