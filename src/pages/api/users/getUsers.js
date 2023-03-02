import conn from "../conn";

export default async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await conn.query(query);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
