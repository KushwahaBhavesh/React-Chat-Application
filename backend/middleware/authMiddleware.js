import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log(accessToken);

  if (!accessToken) {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    let exit = false;

    if (!refreshToken) {
      return res.status(404).json({ message: "Refresh Token Not Found" });
    } else {
      jwt.verify(
        refreshToken,
        process.env.USER_REFRESH_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid Refresh Token" });
          } else {
            const accessToken = jwt.sign(
              { userId: decoded.userId },
              process.env.USER_SECRET_KEY,
              { expiresIn: "1m" }
            );
            res.cookie("accessToken", accessToken, { maxAge: 60000 });
            exit = true;
            next();
          }
        }
      );
    }
    return exit;
  } else {
    jwt.verify(accessToken, process.env.USER_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invallid access Token",
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};
