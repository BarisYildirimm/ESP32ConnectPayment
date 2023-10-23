import mongoose from "mongoose"

const socketSchema = mongoose.Schema({
    socketNumber: {
        type: String,
        required: true,
    },
    unitNumber: {
        type: Number,
        required: true,
    },
    socketName: { // AC DC
        type: String,
        required: true,
        enum: ["AC", "DC"]
    },
    socketType: { // AC -Type2 || DC - DCCombo 2
        type: String,
        required: true,
    },
    socketPower: { //SocketPower KW ...
        type: Number,
        required: true,
    },
    socketVolt: { // Socket Volt
        type: Number,
        required: true,
    },
    socketAmper: { // Socket Amper
        type: Number,
        required: true,
    },
    socketMod: { // Socket Mod ||Mod3 Mode 4 ...
        type: String,
        required: true,
    },
    status: { // Reserved Events ... 
        type: String,
        required: true,
        enum: ["NON_BUSINESS_HOURS", "MAINTENANCE", "FAULT", "RESERVED"]
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date,
        default: Date.now()
    },
    comment: {
        type: String,
        required: true,
    }
})

const Socket = mongoose.model("Socket", socketSchema)
export default Socket;