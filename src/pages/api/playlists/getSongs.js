import conn from "../conn";

export default async (req, res) => {
  try {
    let query = `SELECT song_id FROM playlist_songs WHERE playlist_id = ${req.body.playlist_id}`;
    let result = await conn.query(query);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};
