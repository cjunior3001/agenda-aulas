import clientPromise from "../../../utils/database";

export default async function helloAPI(req, res) {
  if (req.method === 'GET') {
    const { courses } = req.query;

    if (!courses) {
      res.status(400).json({ error: "falta courses name para consultar"});
      return;
    }

    const client = await clientPromise;

    const db = client.db('teach-other');

    const response = await db.collection('users').find({ courses }).toArray();

    if (response.length === 0) {
      res.status(400).json({ error: "Course nao encontrado" });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({message: 'method errado'});
  }

}