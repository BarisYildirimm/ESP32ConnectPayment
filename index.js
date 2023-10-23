import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import http from "http";


import { apiLimiter } from "./middleware/apiLimit.js";

import { WebSocket, WebSocketServer } from "ws";

//WebSocket Models
import Station from "./models/station.js"
import Card from "./models/card.js"
import User from "./models/user.js"

//WebSocket Log
import * as stationLogs from "./utils/stationLogs.js";

//Routes
import stationRoutes from "./routes/station.js";
import socketRouter from "./routes/socket.js"
import systemUserRoutes from "./routes/systemUser.js";
import userRoutes from "./routes/user.js";
import cardRoutes from "./routes/card.js";
import priceRouter from "./routes/price.js"
import testRouter from "./routes/test.js"
import iyzicoCardRouter from "./routes/iyzicoCard.js"
import iyzicoPaymentRouter from "./routes/payment.js"

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Api Limit
app.use(`/api/${process.env.version}`, apiLimiter);

//Routes
console.log("Current Version API :", process.env.version)
app.use(`/api/${process.env.version}/chargeAutomation/chargeAutomationAPI`, stationRoutes);
app.use(`/api/${process.env.version}/socket`, socketRouter)
app.use(`/api/${process.env.version}/systemUser`, systemUserRoutes);
app.use(`/api/${process.env.version}/card`, cardRoutes);
app.use(`/api/${process.env.version}/price`, priceRouter)
app.use(`/api/${process.env.version}/test`, testRouter)
app.use(`/api/${process.env.version}/user`, userRoutes);
app.use(`/api/${process.env.version}/iyzicoCard`, iyzicoCardRouter)
app.use(`/api/${process.env.version}/payments`, iyzicoPaymentRouter)

const PORT = process.env.PORT || 5000;

let keepAliveId;
const server = http.createServer(app);
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server listenig on ->> ${PORT} `);
      console.log("WebSocket Dinleniyor...")
    });
  })
  .catch((err) => console.log("error", err));

const wss =
  process.env.NODE_ENV === "production"
    ? new WebSocketServer({ server })
    : new WebSocketServer({ port: PORT });


// ----- WEBSOCKET -----

const responseData = {
  istasyonDurum: "1",
  kartDurum: "0",
  sarjBaslat: "0",
  fiyat: 0,
};

var cardDataObject;
var stationDataObject;

wss.on("connection", (ws, req) => {
  console.log("webSocket opened!");

  const ip = req.socket.remoteAddress;
  console.log("IP ->>>>", ip)

  ws.on("error", console.error);

  console.log("Client size: ", wss.clients.size);

  if (wss.clients.size === 1) {
    console.log("first connection.");

  }

  //Get Card Control
  ws.on("pong", async (data) => {
    console.log("------------------")
    console.log("ponga girdi!")
    console.log("KART ID :", data.toString())
    await RfidCardControl(data.toString()).then((res) => {
      res.map((data, i) => {
        cardDataObject = {
          cardId: data.cardId,
          status: data.status,
          user: data.user.map((u, index) => {
            return {
              status: u.status,
              name: u.name,
            }
          }),
        }
      })
    })
    keepServerAlive();
    console.log("cardData", cardDataObject);
    console.log("------------------")
  })


  //Get StationCode Control
  ws.on("ping", async (data) => {
    console.log("------------------")
    console.log("pinge girdi!")
    console.log("İstasyon ID :", data.toString())

    await StationCodeControl(data.toString()).then((res) => {
      res.map((data, i) => {
        stationDataObject = {
          stationCode: data.stationCode,
          isPublic: data.isPublic,
          socket: data.socket.map((soc, index) => {
            return {
              status: soc.status,
              socketName: soc.socketName
            }
          }),
        }
      })
    })
    keepServerAlive();

    console.log("Copy Station :", stationDataObject);
    console.log("------------------")
  })

  ws.on("message", (message) => {
    console.log(!(Object.keys(stationDataObject).length === 0))
    try {
      console.log("message Enabled :", message.toString());
      // console.log("Kart Data : ", cardDataObject);

      console.log("StationDataResult : ", !(Object.keys(stationDataObject).length === 0)) // Reset Atilmasi Gerekiyor...
      //Json Kontrol ediliyor ...(JSON ise)
      console.log("isJson :", isJSON(message))
      if (isJSON(message)) {
        const data = JSON.parse(message); // Json parse edildi ...

        console.log("StationDataResult : ", !(Object.keys(stationDataObject).length === 0)) // Reset Atilmasi Gerekiyor...
        console.log("-----------------------------------");


        if (!(Object.keys(stationDataObject).length === 0)) { // Reset Atılmasi Gerekiyor ...

          console.log("İstasyon Aktif!!")
          console.log("-----------------------------------");

          if (!(Object.keys(cardDataObject).length === 0)) {
            console.log("Kart Okundu!");
            console.log("-----------------------------------");
          }
          else {
            console.log("sdfsf")
          }

          // if (!(Object.keys(cardDataObject).length === 0)) {
          //   console.log("Kart Okundu!");
          //   console.log("-----------------------------------");
          //   // responseData.sarjBaslat = 1;
          //   // responseData.fiyat = currData.tuketim * 6;
          //   // responseData.kartDurum = 1;
          //   // ws.send(JSON.stringify(responseData));
          //   //Soketlere geç ve soketlerde aktif ve pasifliğine göre update et.
          // }
        }
      }

      //Json Degil ise
      else {

      }














      // if (isJSON(message)) {
      //   const currData = JSON.parse(message);
      //   if (!(Object.keys(stationDataObject).length === 0) && stationDataObject !== undefined) {
      //     if (!(Object.keys(cardDataObject).length === 0) && cardDataObject !== undefined) {
      //       console.log("Kart Okundu! !");
      //       responseData.sarjBaslat = 1;
      //       responseData.fiyat = currData.tuketim * 6;
      //       responseData.kartDurum = 1;
      //     } else if (currData.sarjDurum === "2") {
      //       console.log("Şarj İptal edildi!");
      //       responseData.kartDurum = 0;
      //       responseData.sarjBaslat = 0;
      //     } else {
      //       responseData.kartDurum = "0";
      //       responseData.sarjBaslat = "0";
      //     }
      //   }

      //   broadcast(ws, currData, false);
      // } else if (typeof message === "string") {
      //   console.log("String Data :", message);
      //   broadcast(ws, message, false);
      // } else {
      //   console.log("Data  :", message);
      // }
      // ws.send(JSON.stringify(responseData));
      // console.log("dataaa :", JSON.stringify(responseData))

    } catch (error) {
      //Başlangıçta errore geçiyor...
      //   console.log("adsadadadasdasdasd Bulunamadı BYEEEE!!");
      //   ws.send("VT de Bulunamadi BYEEEE!!");
      //   console.log("dataaa :", JSON.stringify(responseData))
      console.log("Error")

    }
  });

  ws.on("sendMessage", (mess) => {
    console.log(mess);
  });

  ws.on("disconnect", () => {
    console.log("webSocket kapandi!");
  });
});

const broadcast = (ws, message, includeSelf) => {
  if (includeSelf) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  } else {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

const isJSON = (message) => {
  // console.log(`isJson Message :${message}`); //json ifadeyi yazdırdık obje olarak döndürdük... obje değilse false olsun dedik.
  try {
    const obj = JSON.parse(message);
    // console.log(`Parse Message :${obj}`);//parse edilen mesajı yazdırdık gördük
    //console.log(`object mi ? ${obj && typeof obj === "object"}`); //if degerinin ne dondurdugune bakıldı.
    return obj && typeof obj === "object";
  } catch (err) {
    return false;
  }
};

const keepServerAlive = () => {
  console.log("aaaaaa")
  keepAliveId = setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("Bağlanti OK!");
      }
    });
  }, 5000);
};

const StationCodeControl = async (stationCode) => {
  try {
    const result = await Station.find({ stationCode: stationCode }).populate({ path: "socket" })
    return result;
  } catch (error) {
    return false;
  }
}



const RfidCardControl = async (cardId) => {
  try {
    const result = await Card.find({ cardId: cardId }).populate({ path: "user" })
    return result;
  } catch (error) {
    return false;
  }




}