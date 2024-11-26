const { cloudinary } = require('../config/cloudinary');

const uploadController = {
    // Xử lý upload một ảnh
    uploadSingle: async (req, res) => {
        try {
            res.json({
                success: true,
                file: {
                    url: req.file.path,
                    public_id: req.file.filename
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Xử lý upload nhiều ảnh
    uploadMultiple: async (req, res) => {
        try {
            const urls = req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            }));
            
            res.json({
                success: true,
                files: urls
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Xử lý xóa ảnh
    deleteImage: async (req, res) => {
        try {
            const result = await cloudinary.uploader.destroy(req.params.public_id);
            res.json({
                success: true,
                result: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = uploadController;