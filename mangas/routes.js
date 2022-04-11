const express = require('express');
const router = express.Router();


// utils
const utils = require('./utils')

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

module.exports = router;