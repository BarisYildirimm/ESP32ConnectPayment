import Iyzipay from "iyzipay";
import dotenv from "dotenv";

dotenv.config();

const iyzipay = new Iyzipay({
    "uri": process.env.uri,
    "apiKey": process.env.apiKey,
    "secretKey": process.env.secretKey
});

export default iyzipay;
