import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"./public/temp")
    },
    filename: function (req,file,cb) {
        cb( null , file.originalname)
    }
})

export const upload = multer({ 
    storage,
})


// Basically multer is a middleware that is work like it take images,video from User inputs -
// and upload on project server or folder example - public/temp