import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true
  },
  profile: {
    firstName: String,
    lastName: String,
    birthdate: String,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    location: {
      address: String,
      country: String,
      city: String,
      zipcode: Number
    },
    bio: String,
    profile_picture_url: String,
    social_media: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String
    }
  }
}, { timestamps: true })


const users = mongoose.model('users', userSchema);
export default users;