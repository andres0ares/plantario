import mongoose from 'mongoose'

const CommandSchema = new mongoose.Schema({
    ledRed: {
        type: Number,
        required: true
    },
    ledGre: {
        type: Number,
        required: true
    },
    ledYel: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.models.Command || mongoose.model('Command', CommandSchema);