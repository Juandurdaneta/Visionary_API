const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const chaptersSchema = new mongoose.Model({
    mangaId : {
        type: Number,
        required: true
    },
    number : {
        type: Number,
        required: true
    },
    chapterImages : {
        type: Array
    },
    poster : {
        type: String
    }
})

const mangaSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    userId : {
        type: Number,
        required: true
    },
    overview : {
        type : String
    },
    genres : {
        type : Array,
        required: true
    },
    poster: {
        type: String
    },
    chapters : [chaptersSchema]
})

mangaSchema.plugin(AutoIncrement, {inc_field: 'mangaId'});
chaptersSchema.plugin(AutoIncrement, {inc_field: 'chapterId'});

exports.getManga = function() {
    return mongoose.model("Manga", mangaSchema)
}
exports.getChapter = function() {
    return mongoose.model("Chapter", chaptersSchema)
}

