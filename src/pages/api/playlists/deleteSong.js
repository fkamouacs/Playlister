import conn from "../conn";

export default async (req, res) => {
  try {
    let query = `DELETE FROM playlist_songs WHERE song_id = '${req.body.song_id}' AND playlist_id = '${req.body.playlist_id}'`;
    let result = await conn.query(query);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};
