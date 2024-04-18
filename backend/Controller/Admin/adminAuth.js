
import admintoken from "../../Models/admin/adminAuthModel.js";


export const adminTokenSaveController = async (req, res) => {
  const data = req.body
  try {
    const token_save = await new admintoken(data).save()
    if (!token_save) {
      return res.status(401).json({ message: "Invalid Token", token_save })
    }
    res.cookie('Token', token_save?.Token)
    return res.status(200).json({ success: true, Token: token_save.Token })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in adminAuth" })
  }
}



// Fetch Token 
export const fetchTokenController = async (req, res) => {
  const userId = req.params.userId
  try {

    const response = await admintoken.findOne({ userId: userId })
    if (!response) {
      return res.status(401).json({ message: "response not found" })
    }
    return res.status(200).json({ Token: response.Token })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in adminAuth" })
  }
}

// Logout controller
export const adminLogoutController = async (req, res) => {
  try {
    return res.clearCookie("Token").status(200).json({ success: true, message: "logout Successfully 😁😁 🍀" })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in adminAuth" })
  }
}
