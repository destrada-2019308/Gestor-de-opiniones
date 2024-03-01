'use strict'

import { Schema, model } from 'mongoose'

const commentSchema = Schema({
    comment: {
        type: String,
        required: true
    },
    post: {
        type: Schema.ObjectId,
        ref: 'comment',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
}
)

export default model('comment', commentSchema)