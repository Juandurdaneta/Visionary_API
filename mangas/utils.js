// SCHEMAS
const mangaSchema = require("./models")
const Manga = mangaSchema.getManga();

// JWT
const jwt = require('jsonwebtoken');

// DOTENV
require('dotenv').config();

const validateToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded
}

exports.createManga = function(data, token, response){
    const user = validateToken(token);

    if(user){

        const newManga = new Manga({
            ...data,
            userId : user.userId
        });

        newManga.save((err)=>{
            if(!err){
                response.send({
                    status: 200,
                    message: 'Manga added successfully!'
                })
            }
        })

    } else {
        response.send({
            status: 400,
            message: 'Invalid token, please try again.'
        })
    }

}

exports.getMangas = function(res){

    let manga = Manga.find({}, (err, foundMangas) =>{
        if(!err){
            res.send({
                ...foundMangas
            })
        } 
    })


}

exports.getManga =  function(mangaId, res) {


      Manga.find({mangaId: mangaId}, (err, foundManga) =>{
        if(!err && foundManga != ""){
           res.send({
                ...foundManga
           })
        } else {
            res.send({status: 4004, message: "Manga not found"})
        }
    })


}