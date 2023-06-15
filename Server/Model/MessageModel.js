const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    //text input from user
    message: {
      text: { type: String, required: true },
    },
    //Sender and reciever array
    users: Array,
    //sender 
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  //timestamp to sort
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);