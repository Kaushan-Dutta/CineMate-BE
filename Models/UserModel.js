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
const collectionsSchema=new mongoose.Schema({
    collectionName:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
},{timestamps:true});
const collectionContentSchema=new mongoose.Schema({
    collectionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'CollectionModel',
        required:true,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContentModel",
      required: true,
    },
},{timestamps:true});


const downloadModel=new mongoose.model('DownloadModel',collectionSchema);
const favouriteModel=new mongoose.model('FavouriteModel',collectionSchema);
const userModel = new mongoose.model("UserModel", userSchema);
const collectionsModel = new mongoose.model("CollectionModel", collectionsSchema);
const collectionContent = new mongoose.model("collectionContentModel", collectionContentSchema);

module.exports = { userModel,downloadModel,favouriteModel,collectionsModel,collectionContent };
