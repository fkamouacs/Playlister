import conn from "../conn";

export default async (req, res) => {
  try {
    let query = `SELECT * FROM playlists WHERE id = ${req.body.id}`;
    let result = await conn.query(query);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};
