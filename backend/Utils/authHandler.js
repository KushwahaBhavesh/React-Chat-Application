import bcrypt from 'bcrypt';

export const encryptPassword = async (password) => {
  try {
    const round = 10;
    const encryptedPassword = await bcrypt.hash(password, round);
    return encryptedPassword
  } catch (error) {
    console.log(error)
  }
}
export const encryptConfirmPassword = async (confirmPassword) => {
  try {
    const round = 10;
    const encryptedConfirmPassword = await bcrypt.hash(confirmPassword, round);
    return encryptedConfirmPassword
  } catch (error) {
    console.log(error)
  }
}


export const comparePassowrd = async (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword);
}

export const compareConfirmPassword = async (confirmPassowrd, encryptedConfirmPassword) => {
  return bcrypt.compare(confirmPassowrd, encryptedConfirmPassword);
}