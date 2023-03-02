import jwt from "jsonwebtoken";

export default async (req, res) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.json({
    isLoggedIn: false,
    msg: "INVALID_TOKEN"
  })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json({
      isLoggedIn:false,
      msg: err
    })
    req.user = user;
    res.json({
      isLoggedIn: true,
      user: user
    })
  })
}

