const express = require('express');
const router = express.Router();


// utils
const utils = require('./utils')

// create manga

router.post('/', (req, res) =>{
    utils.createManga(req.body, req.headers.authorization.split(" ")[1], res);
})

// get specific manga

router.get('/:mangaId', (req, res) =>{
    const mangaId = req.params.mangaId;
    utils.getManga(mangaId, res);
})

// get all mangas

router.get('/', (req, res) =>{
    const mangas = utils.getMangas();
    res.send({
        ...mangas
    })
})

// update manga
router.put('/:mangaId', (req, res) =>{
    const mangaId = req.params.mangaId;
    utils.updateManga(mangaId, req.headers.authorization.split(" ")[1], req.body, res);
})

// delete manga

router.delete('/:mangaId', (req, res)=>{
    const mangaId = req.params.mangaId;
    utils.deleteManga(mangaId, req.headers.authorization.split(" ")[1], res )
})