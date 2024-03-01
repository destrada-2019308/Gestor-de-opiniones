'use strict'

import { Schema, model } from 'mongoose'

const postSchema = Schema({
    post: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        ref: 'comment',
        required: true
    },
    user: {
        type: String,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
}
)

export default model('post', postSchema)