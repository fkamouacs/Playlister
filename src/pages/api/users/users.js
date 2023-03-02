import jwt from "jsonwebtoken";
import conn from "../conn";

export const signup = async (req, res) => {
  try {
    const query = `INSERT INTO users (id, email, username, password)
                    VALUES (DEFAULT, '${req.body.email.toLowerCase()}', '${req.body.username.toLowerCase()}', '${
      req.body.password
    }') RETURNING id, email`;
    const result = await conn.query(query);

    const payload = {
      id: result.row[0].id,
      email: result.row[0].email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    const user = {
      userId: result.rows[0].id,
      token: token,
    };

    return res.status(200).json({
      message: "Success",
      user: user,
    });
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    const result = await conn.query(query);

    if (result.rows.length != 0) {
      const payload = {
        id: result.rows.id,
        email: result.rows.email,
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
