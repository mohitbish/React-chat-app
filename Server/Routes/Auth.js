const {
    login,
    register,
    getAllUsers,
    setAvatar,
    logOut,
  } = require("../Controllers/UserController");
  
  const router = require("express").Router();
  
  router.post("/register", register);
  
  
  module.exports = router;