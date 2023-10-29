const mongoose = require("mongoose");
require("../connectDb");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
      enum: ["basic", "premium", "gold"],
      default: "basic",
    },
  },
  { timestamps: true }
);

const collectionSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContentModel",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const downloadModel=new mongoose.model('DownloadModel',collectionSchema);
const favouriteModel=new mongoose.model('FavouriteModel',collectionSchema);
const userModel = new mongoose.model("UserModel", userSchema);

module.exports = { userModel,downloadModel,favouriteModel };
