import mongoose from "mongoose";
import Station from "../models/station.js";

export const getStationAll = async (req, res) => {
  try {
    const stations = await Station.find();
    console.log("İstasyonlar :", stations)
    res.status(200).json({
      type: "StationInfoResultMultipleJsonObject",
      status: "SUCCES",
      message: "Records !",
      stationInfoDTOList: stations,
    });
  } catch (error) {
    res.status(409).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

export const getStations = async (req, res) => {
  try {
    const stationsResult = await Station.find({ provinceCode: req.body.provinceCode })
    res.status(200).json({
      type: "StationInfoResultMultipleJsonObject",
      status: "SUCCES",
      message: "Records found!",
      socketData: stationsResult
    });
  } catch (error) {
    console.log(error)
    res.status(409).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

export const getByIdStation = async (req, res) => {
  try {
    const { stationCode } = req.params;
    const result = await Station.find({ stationCode: stationCode }).populate("socket")

    res.status(200).json({
      type: "StationInfoResultOnject",
      status: "SUCCES",
      message: "Records!",
      stationInfoObject: result
    });
  } catch (error) {
    console.log(error)
    res.status(409).json({
      status: "UNSUCCES",
      message: error
    })
  }
}

export const createStations = async (req, res) => {
  try {
    const newStation = new Station({
      stationCode: req.body.stationCode,
      stationModel: req.body.stationModel,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      provinceCode: req.body.provinceCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      socket: req.body.socket,
      isPublic: req.body.isPublic,
    });
    await newStation.save();
    res.status(200).json({
      status: "SUCCES",
      message: "Station Added!",
    });
  } catch (error) {

    res.status(409).json({
      status: "UNSUCCES",
      message: error,
    });
  }
}

export const updateStations = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(409).json("ID Not Found!");

    const result = await Station.findByIdAndUpdate(
      _id,
      {
        stationCode: req.body.stationCode,
        stationModel: req.body.stationModel,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        provinceCode: req.body.provinceCode,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        socket: req.body.socket,
        isPublic: req.body.isPublic,
        _id,
      }
    );
    await result.save();
    console.log("RESULT :", result)
    res.status(200).json({
      status: "SUCCES",
      message: "Station Updated!",
    });
  } catch (error) {
    console.log(error)
    res.status(409).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

export const deleteStations = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(409).json("ID Not Found!");

  await Station.findByIdAndDelete(id);

  res.json({ status: "SUCCES", message: "Station Deleted!" });
};
