const {
  login,
  register,
  allusers,
  setAvatar,
  logOut,
} = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", allusers);

module.exports = router;
