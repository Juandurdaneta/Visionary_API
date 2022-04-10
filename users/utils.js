const jwt = require('jsonwebtoken')
// secret key
const secretKey = process.env.SECRET_KEY
// schemas
const userSchema = require('./models.js')
const User = userSchema.getUser();

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

exports.updateUser = function(data, response, token) {

  const decoded = jwt.verify(token, secretKey)
  console.log(decoded)
  decoded && User.findOneAndUpdate({userId: decoded.userId }, data, (err, foundUser)=>{

              if(!err && foundUser){

                signUser(foundUser._doc, secretKey, response);
         
              } 
                else {
                console.log(err)
                response.send({
                  status: 400,
                  message: "An error has occurred, please try again."
                })
              }


            });





}

function signUser(userDoc, key, response) {

  jwt.sign(userDoc, key, (err, newToken)=>{

    if(!err){
        response.send({
            status: 200,
            token: newToken,
            message: "User updated successfully!"
        })
    } else {
        console.log(err)
        response.send( JSON.stringify(err))
    }

  })

}