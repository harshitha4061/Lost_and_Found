const cloudinary = require('cloudinary').v2;

require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

   async function getUploadUrl(id){
      var respnse = null;
      cloudinary.uploader.upload("C:/Users/harsh/Downloads/"+id
      ).then((data)=>{
            respnse = data.url;
      });
      return respnse;
}

module.exports  = {getUploadUrl};