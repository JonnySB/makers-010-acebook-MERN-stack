const User = require("../models/user.js")
const { generateToken } = require("../lib/token");
const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

const uploadProfileImg = async (req, res) => {
  const userID = req.user_id;
  const token = generateToken(userID);
  const fileDataURL = req.body.file;
  const publicID = req.body.public_id;
  const folder = "profile/"
  const path = process.env.CLOUDINARY_BASE_URL + folder + publicID + ".png"

  cloudinary.uploader
  .upload(fileDataURL, 
    { folder: folder, public_id: publicID, width: 200, height: 200, crop: "fill", format: "png", radius: "max", overwrite: true, invalidate: true})
    .then(() => {
      User.findByIdAndUpdate(userID, {profileImg: path})
      .then(res.status(200).json({ token: token }));
    });
};


const ImagesController = {
  uploadProfileImg: uploadProfileImg,
};

module.exports = ImagesController;
