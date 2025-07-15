import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'public/images'); //path for the folder where images will be saved.
  },
  filename:(req, file, cb)=>{
    let file_name = `${uuidv4()}_${file.originalname}`; // to generate unique filename in backend 
    cb(null, file_name);
  }
});

const uploadImage = multer({
  storage:storageConfig
});

export default uploadImage;