const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    text: {
        type: String,
        required: [true, "Text is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
},
    {
        timestamps: true
    })

const Post = model("Post", postSchema)

module.exports = Post

