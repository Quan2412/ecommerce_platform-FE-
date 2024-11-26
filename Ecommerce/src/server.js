const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Sử dụng cors để cho phép các request từ localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/api/images', async (req, res) => {
    const folderName = req.query.folderName || ''; // Lấy tên folder từ query parameters

    try {
        const response = await axios.get(`https://api.cloudinary.com/v1_1/dgk73vcb2/resources/image`, {
            auth: {
                username: '694892647848487',
                password: 'C2Q57P4XvVkKfiE32AA39PunS8w'
            },
            params: {
                prefix: folderName, // Chỉ định folder muốn lấy ảnh
                type: 'upload' // Chỉ lấy ảnh đã được upload
            }
        });
        res.json(response.data.resources);
    } catch (error) {
        console.error("Error fetching images from folder:", error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
