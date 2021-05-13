import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    tempMin: {
        type: Number,
        required: true
    },
    tempMax: {
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
    reservatorio: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);