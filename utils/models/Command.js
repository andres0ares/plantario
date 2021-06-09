import mongoose from 'mongoose'

const CommandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    ilu: {
        type: Number,
        required: true
    },
    umi: {
        type: Number,
        required: true
    },
    openSombrete: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.models.Command || mongoose.model('Command', CommandSchema);