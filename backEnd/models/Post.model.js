const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    text: {
        type: String,
        required: [true, "Text is required"]
    },
    isLiked: {
        type: Boolean
    }
},
    {
        timestamps: true
    })

const Post = model("Post", postSchema)

module.exports = Post

