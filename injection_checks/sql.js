function isValidPassword(password){  
  return /^[\w]+$/.test(password);
}

function isValidEmail(str) {
  return /^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/.test(str);
}

module.exports = {isValidEmail, isValidPassword};