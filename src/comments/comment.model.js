'use strict'

import { Schema, model } from 'mongoose'

const commentSchema = Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    maintext: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }

}, {
    versionKey: false 
})

export default model('comment', commentSchema)