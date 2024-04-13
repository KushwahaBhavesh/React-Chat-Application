import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    verified:{
      type:Boolean,
      default:false,
    },
    profile: {
      firstName: String,
      lastName: String,
      birthdate: String,
      gender: {
        type: String,
        enum: ["male", "female"],
      },
      location: {
        address: String,
        country: String,
        city: String,
        zipcode: Number,
      },
      bio: {
        type: String,
      },
      profile_picture_url: {
        type: String,
        default: "",
      },
      social_media: [
        {
          media: String,
          URL: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);
export default users;
