import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: { //Kullanici banlama durumu , true-false
    type: Boolean,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true
  },
  selectedFile: {
    type: String,
    required: false,
  },
  locale: {
    type: String,
    required: true,
    default: "tr",
    enum: ["tr", "en"]
  },
  identityNumber: {
    type: String,
    required: false,
    default: "00000000000"
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    default: "Turkey"
  },
  zipCode: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
    default: "85.34.78.112"
  },
  cardUserKey: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timeStamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password
      return {
        ...ret
      }
    }
  }
});
const User = mongoose.model("User", userSchema);
export default User;