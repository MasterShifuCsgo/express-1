


//awaitable helper function that returns null if dosent exist and row if it does.
function checkIfExists(stmt, value){
  return new Promise((resolve, reject) => {
    stmt.get([value],(err, row) => {
      if(err){reject({error: err, code: 2})}
      resolve(row); // can be null;
    })
  })
}

module.exports = {checkIfExists};