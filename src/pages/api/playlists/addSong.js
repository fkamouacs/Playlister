import conn from "../conn";

export default async (req, res) => {
  try {
    let query = `SELECT id FROM songs WHERE link = '${req.body.link}'`;
    let result = await conn.query(query);
    let song_id;

    if (result.rows.length == 0) {
      query = `INSERT INTO songs(title, link)
        VALUES ('${req.body.title}', '${req.body.link}') returning id`;
      result = await conn.query(query);
    }
    song_id = result.rows[0].id;

    query = `INSERT INTO playlist_songs(playlist_id, song_id)
    VALUES (${req.body.playlist_id}, ${song_id})`;
    result = await conn.query(query);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  }
};
