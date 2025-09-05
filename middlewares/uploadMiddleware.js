const multer = require('multer')
const path = require('path')

const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
});

const uploadMulter = multer({storage: fileStorageEngine})

module.exports = uploadMulter;
