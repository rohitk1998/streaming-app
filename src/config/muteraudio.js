
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req,file, cb)=> {
      cb(null,"./public/tracks")
    },
    filename : (req,file,cb)=>{
      let songOrgName = ""
      let file_name = (file.originalname).toString()
      let newStr = (file_name).split(" ")
      for(var i = 0 ; i < newStr.length ; i++){
      songOrgName += newStr[i]
      }
      console.log("file name saved in public ::",songOrgName);
      cb(null,songOrgName)
    }
  })
  
  const fileFilter = (req,file,cb)=>{
      console.log("file",file);
    if(file.mimetype === "audio/mpeg"){
      cb(null,true)
    }
    else{
      cb(null,false)
    }
  }
  
  const uploadAudio = multer({
    storage : storage , 
    fileFilter : fileFilter
  })


  module.exports = {uploadAudio} ; 