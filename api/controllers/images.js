const { generateToken } = require("../lib/token");
const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (req, res) => {
  const token = generateToken(req.user_id);
  const fileDataURL = req.body.file;
  const publicID = req.body.public_id;

  cloudinary.uploader
  .upload(fileDataURL, 
    { folder: "profile/", public_id: publicID, width: 200, height: 200, crop: "fill", format: "png", radius: "max"})
  .then(res.status(200).json({ token: token }));
};


const ImagesController = {
  uploadImage: uploadImage,
};

module.exports = ImagesController;
