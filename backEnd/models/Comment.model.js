const { Schema } = require("mongoose");

const commentSchema = new Schema({

    text: {
        type: String,
        required: [true, "Text is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Comment = model("Comment", commentSchema)

module.exports = Comment

