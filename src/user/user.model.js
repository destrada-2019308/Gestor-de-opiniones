import { Schema, model } from "mongoose";

const userSchema = Schema({ 
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['CLIENT'],
        required: true
    }
}, {
    versionKey: false //Desahabilitar el __v (version del documento)
})

export default model('user', userSchema)