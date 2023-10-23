import mongoose from "mongoose";
import Socket from "../models/socket.js"
import Station from "../models/station.js";

export const getByIdSocket = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Socket.findById(id);

        res.status(200).json({
            type: "SocketInfoResultObject",
            status: "SUCCES",
            message: "RECORDS !",
            socketInfoObject: result
        });

    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}

export const getAllSocket = async (req, res) => {
    try {
        const sockets = await Socket.find();
        res.status(200).json({
            type: "SocketInfoResultJsonObject",
            status: "SUCCES",
            message: "Records !",
            socketInfoList: sockets
        });
    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}

export const createSocket = async (req, res) => {
    try {
        const newSocket = await new Socket({
            socketNumber: req.body.socketNumber,
            unitNumber: req.body.unitNumber,
            socketName: req.body.socketName,
            socketType: req.body.socketType,
            socketPower: req.body.socketPower,
            socketVolt: req.body.socketVolt,
            socketAmper: req.body.socketAmper,
            socketMod: req.body.socketMod,
            status: req.body.status,
            startTime: Date.now(),
            endTime: Date.now(),
            comment: req.body.comment,
        });

        await newSocket.save();

        res.status(200).json({
            status: "SUCCES",
            message: "Socket Added!"
        })
    } catch (error) {
        res.status(409).json({
            type: "UNSUCCES",
            message: error
        })
    }
}

export const updateSocket = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(409).json("ID Not Found !")

        const result = await Socket.findByIdAndUpdate(_id,
            {
                socketNumber: req.body.socketNumber,
                unitNumber: req.body.unitNumber,
                socketName: req.body.socketName,
                socketType: req.body.socketType,
                socketPower: req.body.socketPower,
                socketVolt: req.body.socketVolt,
                socketAmper: req.body.socketAmper,
                socketMod: req.body.socketMod,
                status: req.body.status,
                endTime: Date.now(),
                comment: req.body.comment
            })

        console.log("Result : ", result)

        res.status(200).json({
            status: " SUCCES",
            message: "socket Updated! "
        });
    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}

export const deleteSocket = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(409).json("ID Not Found !");

        await Socket.findByIdAndDelete(_id);

        await Station.updateMany({
            "socket": _id
        }, {
            $pull: { socket: _id }
        })
        await res.status(200).json({
            status: "SUCCES",
            message: "Socket Deleted !"
        });
    } catch (error) {
        res.status(409).json({
            type: "UNSUCCES",
            message: error
        })
    }
}