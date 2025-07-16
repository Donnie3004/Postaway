import fsPromise from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname,'..','logs', 'log.txt');

async function log(reqURL, reqBody) {
  try {
    const logData = `${new Date().toString()} \n req URL : ${reqURL}\n req Body : ${reqBody}\n\n`;
    await fsPromise.appendFile(filePath,logData);
  } catch (err) {
    console.log(err);
  }
}

export const loggerMiddleware = async (req, res, next) => {
  let reqBody = req.body;
  let reqURL = req.url;
  if(Object.keys(reqBody).length === 0){
    reqBody = "No body received..!"
  }
  if(reqURL){
    await log(reqURL, JSON.stringify(reqBody));
  }
  next();
};
export default loggerMiddleware;
