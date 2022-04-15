// SCHEMAS
const mangaSchema = require("./models");
const Manga = mangaSchema.getManga();
const Chapter = mangaSchema.getChapter();
// JWT
const jwt = require('jsonwebtoken');
var path = require('path');

// DOTENV
require('dotenv').config();

const validateToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded
}
var fs = require('fs');


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
            } else{
                response.send({
                    status: 500,
                    message: "Failed to add manga, please try again..."
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

     Manga.find({}, (err, foundMangas) =>{
        if(!err){
            res.send({
                foundMangas
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
            res.send({status: 404, message: "Manga not found"})
        }
    })

}

exports.updateManga = function(mangaId, token, data, res){

    const propietary = validateToken(token);

    Manga.findOneAndUpdate({mangaId: mangaId, userId: propietary.userId}, data, (err, foundManga) => {
        if(!err && foundManga){
            res.send({
                status: 200,
                message: "Manga updated successfully"
            })
        } else {
            res.send({
                status: 400,
                 message: "Failed to update manga, please try again..."
        })
        }
    })
}

exports.deleteManga = function(mangaId, token, res) {

    const propietary = validateToken(token);

    Manga.findOneAndDelete({mangaId: mangaId, userId: propietary.userId}, (err, deletedManga) =>{
        if(!err && deletedManga){
            res.send({
                status: 200,
                message: "Manga removed successfully"
            })
        } else {
            res.send({
                    status: 400,
                     message: "Failed to delete manga, please try again..."
            })
        }
    })


}

// chapter utils

// create chapter
exports.createChapter = function(mangaId, chapterNumber, files, res){

    const newChapter = new Chapter({
        mangaId: mangaId,
        number: chapterNumber,
        chapterImages: files
    });

    Chapter.create(newChapter, (err, item)=>{
        if(err){
            res.send({
                status: 400,
                message: "Something went wrong.",
                errorLog: err
            })
        } else {
           Manga.findOneAndUpdate({mangaId: mangaId}, {$push: {chapters: item._id}}, {new: true}, (err, manga)=>{
            res.send({
                status: 200,
                message: "Chapter added successfully!"
            })
           })
        }
    })

 



}

// get chapter's

exports.getChapters = function(mangaId, res){
    Chapter.find({mangaId: mangaId}, (err, chaptersFound) =>{
        if(!err){
            res.send({
                chaptersFound
            })
        }
    })
}

