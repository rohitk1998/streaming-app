const express = require("express");
const {userController} = require("../controller/index")
const {upload} = require("../config/multer")

const userRouter = express.Router()

userRouter.post('/register', userController.addNewUser)
userRouter.get('/all', userController.findAllUser)
userRouter.post('/user/:id',userController.findUserById)
userRouter.post('/updateuser/:id',userController.updateUser)
userRouter.delete('/deleteuser/:id',userController.deleteUser)
userRouter.post("/login",userController.loginUser)
userRouter.post("/send-email",userController.sendMail)
userRouter.post("/uploadfile" , upload.single("profile") , userController.upload)
userRouter.post("/change-password", userController.changePass)

module.exports = userRouter ;