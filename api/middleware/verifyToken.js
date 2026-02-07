export const verifyToken = (req, res, next) => {
  const userInfo = req.session.userInfo;

  if (!userInfo) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  req.userId = userInfo.sub; 

  next();
};