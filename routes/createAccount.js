const {v4: createUUID} = require("uuid");

function isValidPassword(password){
  /^[\w]+$/.test(password);
}

function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}


// when account is created, sends the auth back to indicate account creation.

//used when user registers
function createAccount(db){  
  return function(req, res){        
    const body = req.body;            
    //check if body has attributes 'email', 'password';
    if(!('email' in body) && ('password' in body) && ('name' in body)){
      return res.send({error : "Body has no email, password or name"});      
    }      
    
    //prevent SQL injection
    if(isValidPassword(body.password)){
      console.log("password valid");
    }
    if(isValidEmail(body.email)){
      console.log("email valid");
    }
    
    //creating account in database    
    //check if name already exists in database
    db.get("select 1 from users where real_name=?", [body.name], (err, row) => {
      if(err){console.log(err);};
      if(row){return res.send({error: "user with similar name exists", code: 0});}
    
      const newUUID = createUUID(); 

      db.run("INSERT INTO users (auth, real_name, password, email) VALUES (?,?,?,?)", [newUUID, body.name, body.password, body.email], 
        (err) => {
        if(err){
          res.status(500).send({error: "Failed to create user", code: 1})
        };
          res.send({auth: newUUID});
        });
    })
  };
}

module.exports = createAccount;