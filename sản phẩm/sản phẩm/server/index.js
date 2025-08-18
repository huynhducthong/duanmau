require("dotenv").config();
const express = require("express");
const upload = require("./middleware/multer");
const cloudinary = require("./utils/cloudinary");
const cors = require("cors");

// tạo ứng dụng express
const app = express();
app.use(express.json()); // giúp server đọc dữ liệu JSON từ request
app.use(cors()); // cho phép server chấp nhận request từ các domain khác

app.get("/", (req, res) => {
    res.send("Send post request to /upload to upload image");
});

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error",
            });
        }

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: result,
        });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));