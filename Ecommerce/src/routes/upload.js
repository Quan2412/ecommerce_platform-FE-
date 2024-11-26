const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const uploadController = require('../controllers/uploadController');

// Route upload một ảnh
router.post('/single', upload.single('image'), uploadController.uploadSingle);

// Route upload nhiều ảnh
router.post('/multiple', upload.array('images', 5), uploadController.uploadMultiple);

// Route xóa ảnh
router.delete('/delete/:public_id', uploadController.deleteImage);

module.exports = router;