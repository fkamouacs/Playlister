import conn from "../conn";

export default async (req, res) => {
  try {
    let query = `SELECT * FROM songs WHERE id = ${req.body.id}`;
    let result = await conn.query(query);

    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
