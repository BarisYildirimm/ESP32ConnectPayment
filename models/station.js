import mongoose from "mongoose";

const stationSchema = mongoose.Schema({
  stationCode: {
    type: String,
    required: true,
  },
  stationModel: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "Turkey"
  },
  provinceCode: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  socket: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Socket"
  },
  isPublic: { // Kalsin
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
})
const Station = mongoose.model("Station", stationSchema);
export default Station;
