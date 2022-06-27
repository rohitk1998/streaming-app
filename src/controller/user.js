const { userdao } = require("../dao/index");
const { transportMail } = require("../config/nodemailer");
var randomToken = require("random-token");

require("dotenv").config();

var userController = {
  addNewUser: addNewUser,
  findAllUser: findAllUser,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteUser: deleteUser,
  loginUser: loginUser,
  sendMail: sendMail,
  upload: uploadFile,
  changePass: changePass,
};

async function addNewUser(req, res) {
  let user = req.body;
  userdao
    .create(user)
    .then((data) => {
      res.send({
        status: 201,
        message: "User created successfully",
        data: {
          id: data.id,
          username: data.username,
          email: data.email,
          user_profile: data.user_profile,
          device_token: data.device_token,
          device_type: data.device_type,
          user_type: data.user_type,
          created_At: data.createdAt,
          updated_At: data.updatedAt,
        },
        error: false,
      });
    })
    .catch((error) => {
      console.log("error", error);
      // res.send({
      //   errorField: error.name,
      //   error_message: error?.errors[0]?.message,
      // });
    });
}

function findUserById(req, res) {
  userdao
    .findById(req.params.id)
    .then((data) => {
      res.send({
        status: 200,
        message: "User fetched successfully",
        data: data,
        error: false,
      });
    })
    .catch((error) => {
      res.send({
        errorField: error.name,
        error_message: error?.errors[0]?.message,
      });
    });
}

function deleteUser(req, res) {
  userdao
    .deleteById(req.params.id)
    .then((data) => {
      res.send({
        status: 200,
        message: "User deleted successfully",
        data: data,
        error: false,
      });
    })
    .catch((error) => {
      res.send({
        errorField: error.name,
        error_message: error?.errors[0]?.message,
      });
    });
}

function updateUser(req, res) {
  userdao
    .updateUser(req.body, req.params.id)
    .then((data) => {
      if (data[0] !== 0) {
        res.send({
          status: 200,
          message: "User updated successfully",
          data: {
            id: data[1]?.id,
            username: data[1]?.username,
            email: data[1]?.email,
            user_profile: data[1]?.user_profile,
            device_token: data[1]?.device_token,
            device_type: data[1]?.device_type,
            createdAt: data[1]?.createdAt,
          },
          error: false,
        });
      } else {
        res.send({
          status: 200,
          message: "User does not exist in database",
          data: {},
          error: true,
        });
      }
    })
    .catch((error) => {
      res.send({
        errorField: error.name,
        error_message: error?.errors[0]?.message,
      });
    });
}

function findAllUser(req, res) {
  userdao
    .findAll()
    .then((data) => {
      res.send({
        status: 200,
        message: "Users fetched successfully",
        data: data,
        error: false,
      });
    })
    .catch((error) => {
      res.send({
        errorField: error.name,
        error_message: error?.errors[0]?.message,
      });
    });
}

function loginUser(req, res) {
  const email = req.body.email;
  const pass = req.body.password;
  userdao
    .login(email, pass)
    .then((data) => {
      if (data !== null) {
        res.send(data);
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      console.log("error", error);
      // res.send({
      //   errorField: error.name,
      //   error_message: error?.errors[0]?.message,
      // });
    });
}

function sendMail(req, res) {
  var email = req.body.email;
  var token = randomToken(6);
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "password reset",
    html: `<p>Requested password link</p>
    <h6>Click on this link <a href="http://localhost:3000/${token}"></a> to reset the password</h6>
    `,
  };

  userdao.findByEmail(email).then((data) => {
    if (!data) {
      res.send({
        status: 422,
        message: "User does not exist with entered email",
        data: {},
        error: true,
      });
    } else {
      transportMail.sendMail(mailOptions, function (err, info) {
        if (err) {
          res.send({
            status: 421,
            message: "Error while sending email",
            data: {},
            error: true,
          });
        } else {
          res.send({
            status: 200,
            message: "Email send successfully",
            data: {},
            error: false,
          });
        }
      });
    }
  });
}

function uploadFile(req, res, next) {
  if (req.file) {
    const pathName = req.file.path;
    res.send({
      status: 200,
      data: {
        filename: req.file.originalname,
        path: pathName,
      },
      error: false,
      message: "Successfully uploaded file",
    });
  } else {
    res.send({
      status: 200,
      data: {},
      error: true,
      message: "Error uploading file",
    });
  }
}

async function changePass(req, res, cb) {
  var userid = req.body.userid;
  var oldpass = req.body.oldpass;
  var newpass = req.body.newpass;

  userdao
    .updatePass(userid, oldpass, newpass)
    .then((data) => {
      console.log("update password data", data);
      if (data !== null) {
        res.send(data);
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      console.log("error", error);
      // res.send({
      //   errorField: error.name,
      //   error_message: error?.errors[0]?.message,
      // });
    });
}

module.exports = userController;
