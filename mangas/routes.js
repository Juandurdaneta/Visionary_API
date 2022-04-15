const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var fs = require('fs');
// utils
const utils = require('./utils')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var newDestination = 'mangas/uploads/' + req.params.mangaId;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }       
        cb(null, newDestination);
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage })


// create manga

router.post('/', (req, res) =>{
    try{
        utils.createManga(req.body, req.headers.authorization.split(" ")[1], res);
    } catch(err) {
        res.send({
            status: 400,
            message: "Authorization token invalid or not provided..."
        })
    }
})

// get specific manga

router.get('/:mangaId', (req, res) =>{
    const mangaId = req.params.mangaId;
    utils.getManga(mangaId, res);

})

// get all mangas

router.get('/', (req, res) =>{
    utils.getMangas(res);
})

// update manga
router.put('/:mangaId', (req, res) =>{
    const mangaId = req.params.mangaId;
    utils.updateManga(mangaId, req.headers.authorization.split(" ")[1], req.body, res);
})

// delete manga

router.delete('/:mangaId', (req, res)=>{
    const mangaId = req.params.mangaId;
    try{
        utils.deleteManga(mangaId, req.headers.authorization.split(" ")[1], res )
    } catch(err) {
        res.send({
            status: 400,
            message: "Authorization token invalid or not provided..."
        })
    }

})

// post chapter

router.post('/:mangaId',  upload.array('multi-files'), (req, res) =>{
    const mangaId = req.params.mangaId;

    const chapterNumber = req.body.chapterNumber

    const filesUploaded = req.files;

    const chapterImages = []

    filesUploaded.map((file)=>{
        chapterImages.push({
            data: fs.readFileSync(path.join(__dirname + '/uploads/'+ mangaId + "/" + file.filename)),
            contentType: 'image/png'
        })
    })

    utils.createChapter(mangaId, chapterNumber, chapterImages, res );
        

})

module.exports = router;