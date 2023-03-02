import jwt from "jsonwebtoken";
import conn from "../conn";

export default async (req, res) => {
  try {
    const query = `INSERT INTO users (id, email, username, password)
                    VALUES (DEFAULT, '${req.body.email.toLowerCase()}', '${req.body.username.toLowerCase()}', '${
      req.body.password
    }') RETURNING id`;
    const result = await conn.query(query);

    const payload = {
      id: result.row[0].id,
      email: result.row[0].email,
      username: result.row[0].username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
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
