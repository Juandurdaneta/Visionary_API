const jwt = require('jsonwebtoken')
// secret key
const secretKey = process.env.SECRET_KEY

exports.setProfilePicture = function(username){
    return `https://avatars.dicebear.com/api/identicon/${username}.svg`
}

exports.validateEmail = function(email) {
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}

exports.getUserData = function(token) {
  const decoded = jwt.verify(token, secretKey)
  return decoded
}