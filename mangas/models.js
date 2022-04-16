const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

let chaptersSchema = new mongoose.Schema({
    mangaId : {
        type: Number,
        required: true
    },
    number : {
        type: Number,
        required: true
    },
    chapterImages : [{
        data: String,
        contentType: String
    }]
})

const mangaSchema = new mongoose.Schema({
    title : {
        type: String,
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
    datePublished : {
        type: Date,
        default: Date.now
    },
    userId : {
        type: Number,
        required: true
    },
    author : {
        type: String
    },
    followers : {
        type: Number,
        default: 0
    },
    chapters : [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
    
})

mangaSchema.plugin(AutoIncrement, {inc_field: 'mangaId'});
chaptersSchema.plugin(AutoIncrement, {inc_field: 'chapterId'});

exports.getManga = function() {
    return mongoose.model("Manga", mangaSchema)
}
exports.getChapter = function() {
    return mongoose.model("Chapter", chaptersSchema)
}

