const cloudinary = require("cloudinary");

cloudinary.config({
       cloud_name: 'ddq1f78ht',
    api_key: '579369184949759',
    api_secret: 'zjnalAtxRnR1CVelDieZv--rWCE'
})

async function imageUpload(img) {
      try {
            const imgupload = await cloudinary?.uploader?.upload(img,{resource_type:"auto"})
            return imgupload;
      } catch (error) {
            console.log("getting error in uploadimage",error)
      }
      
}module.exports = imageUpload;