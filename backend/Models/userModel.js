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
  }

})


const users = mongoose.model('users', userSchema);
export default users;