import conn from "../conn";

export default async (req, res) => {
  try {
    let query = `INSERT INTO playlists(title, user_id)
    VALUES ('${req.body.title}', ${req.body.user_id})`;
    let result = await conn.query(query);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};
