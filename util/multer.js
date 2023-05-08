import multer from 'multer';


const multerStorage = multer.memoryStorage();


const multerFilter = (req , file , cb) => {
    if(file.mimetype.startsWith("image")) cb(null , true);
    else cb("ADDonly image" , null)
}

const upload = multer({fileFilter : multerFilter , storage : multerStorage});
const uploadSingleImage = (filedname = "image")=> {
    upload.single(filedname);
}

const uploadFiled = (singleImageName , multiImageName , maxSingle = 1 , maxMulti = 5) => {
    upload.fields([
        { name: `${singleImageName}`, maxCount: maxSingle },
        { name: `${multiImageName}`, maxCount: maxMulti }
    ])
}


export {
    uploadSingleImage,
    uploadFiled
}