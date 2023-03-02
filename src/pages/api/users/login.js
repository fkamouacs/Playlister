import conn from "../conn";

export default async (req, res) => {
  var jwt = require("jsonwebtoken");
  
  try {
    const query = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    const result = await conn.query(query);

    if (result.rows.length != 0) {
      const payload = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        username: result.rows[0].username
      };
      //jwt
     
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) return res.json({ message: err });

          return res.status(200).json({
            message: "Success",
            id: result.rows.id,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //res.send(result);
  } catch (error) {
    console.log(error);
  }
};
