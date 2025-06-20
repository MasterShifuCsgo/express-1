const {v4: createUUID} = require("uuid");
const {isValidEmail, isValidPassword} = require('../injection_checks/sql.js');
const {checkIfExists} = require('../helpers/helpers.js');
// when account is created, sends the auth back to indicate account creation.

//awaitable createUser
async function createUser(body, db){
  return new Promise((resolve, reject) =>{    
    const newUUID = createUUID(); //auth should always be unique.  

    db.run("INSERT INTO users (auth, name, password, email) VALUES (?,?,?,?)", 
      [newUUID, body.name, body.password, body.email], 
        (err) => {
          if(err){
            console.log(err);
            return reject({error: err, code: 1})
          };     

          console.log("Account created:", newUUID);             
          resolve({auth: newUUID});
    });
  })
}

//used when user registers
function createAccount(db){  
  return async function(req, res){        
    const body = req.body;            
    //check if body has attributes 'email', 'password';
    if(!('email' in body) && ('password' in body) && ('name' in body)){
      return res.status(500).send({error : "Body has no email, password or name", code: 1});      
    }      
    
    //prevent SQL injection    
    let check = isValidPassword(body.password);
    if(!check){return res.status(500).send({error: "Please send valid password with ASCII characters", code: 1}); }
    check = isValidEmail(body.email);
    if(!check){return res.status(500).send({error: "Please send valid email with ASCII characters", code: 1}); }    
    
    //run both get funcitons async, if one fails, sends error message.
    const hasName = db.prepare("select * from users where name=?");    
    const hasEmail = db.prepare("select * from users where email=?");            
    
    const name = await checkIfExists(hasName, body.name);
    const email = await checkIfExists(hasEmail, body.email);
    

    if(!name && !email){
      try {
        const auth = await createUser(body, db); //sends auth with uuid
        res.status(201).send(auth);
      }catch (err){
        res.status(500).send({code: 1, error: err});
      }
    }    
    res.status(409).send({error: "User already exists", code: 0});

    }      
  }

module.exports = createAccount;