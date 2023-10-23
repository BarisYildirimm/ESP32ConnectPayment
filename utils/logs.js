import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const logFile = (fileName, data) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log(__dirname);
  const dir = path.join(__dirname, `../logs/${fileName}.json`);
  const writeData = JSON.stringify(data, null, 4);
  fs.writeFileSync(dir, writeData);
};
