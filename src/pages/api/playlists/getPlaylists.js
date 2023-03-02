import conn from "../conn";

export default async (req, res) => {
  try {
    // get user_id
    let query = `SELECT id FROM users WHERE username = '${req.body.username}'`;
    let result = await conn.query(query);

    query = `SELECT * FROM playlists WHERE user_id = '${result.rows[0].id}'`;
    result = await conn.query(query);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};
