const { User } = require("../modals/index");
const bcrypt = require("bcrypt");
const randomToken = require("random-token");

var response = "";

var userDao = {
  findAll: findAll,
  create: createUser,
  findById: findById,
  deleteById: deleteById,
  updateUser: updateUser,
  login: loginUser,
  findByEmail: findByEmail,
  updatePass: updatePass,
};

function findAll() {
  return User.findAll();
}

function findById(id) {
  return User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
    returning: true,
    plain: true,
  });
}

function deleteById(id) {
  return User.destroy({ where: { id: id } });
}

async function createUser(user) {
  const salt = await bcrypt.genSalt(10);
  var user_id = randomToken(12);
  var device_token_ = randomToken(15);
  var new_user = {
    id:user_id,
    username: user.username,
    email: user.email,
    password: await bcrypt.hash(user.password, salt),
    profile: user.profile,
    contact:user.contact,
    bio:user.bio,
    device_token: device_token_,
    device_type: user.device_type,
    type: user.type,
  };
  var newUser = new User(new_user);
  return await newUser.save();
}

function updateUser(user, id) {
  var updateUser = {
    username: user.username,
    email: user.email,
    profile: user.profile,
    device_token: user.device_token,
    device_type: user.device_type,
  };
  return User.update(updateUser, {
    where: { id: id },
    attributes: {
      exclude: ["password"],
    },
    returning: true,
    plain: true,
  });
}

async function loginUser(email, password) {
  const user = await User.findOne({
    where: { email: email },
  });
  if (user) {
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      response = {
        status: 200,
        message: "User login successfully",
        data: {
          id: user?.id,
          username: user?.username,
          email: user?.email,
          profile: user?.profile,
          device_token: user?.device_token,
          device_type: user?.device_type,
          createdAt: user?.createdAt,
        },
        error: false,
      };
    } else {
      response = {
        status: 400,
        message: "Invalid user credential",
        data: {},
        error: true,
      };
    }
  } else {
    response = {
      status: 200,
      message: "User does not exist in the database",
      data: {},
      error: true,
    };
  }

  return response;
}

async function findByEmail(email) {
  const response = await User.findOne({
    where: { email: email },
  });
  return response;
}

async function updatePass(id, password, newpassword) {
  var oldpass = password;
  const salt = await bcrypt.genSalt(10);
  const newpass = await bcrypt.hash(newpassword, salt);
  const user = await User.findByPk(id);
  console.log("user detail", user);
  if (user) {
    const password_valid = await bcrypt.compare(oldpass, user.password);
    if (password_valid) {
      const updateresponse = await User.update(
        { password: newpass },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );
      response = {
        status: 200,
        message: "Password changed successfully",
        data: {},
        error: false,
      };
    } else {
      response = {
        status: 200,
        message: "Entered old password is wrong",
        data: {},
        error: false,
      };
    }
  } else {
    response = {
      status: 200,
      message: "User does not exist in the database",
      data: {},
      error: false,
    };
  }
  return response;
}

module.exports = userDao;
