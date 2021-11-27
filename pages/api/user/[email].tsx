import clientPromise from "../../../utils/database";

export default async function helloAPI(req, res) {
  //MOSTRA INFORMACAO DO STUDENT
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ error: "falta email para consultar"});
      return;
    }

    console.log(email);
    

    const client = await clientPromise;

    const db = client.db('teach-other');

    const response = await db.collection('users').findOne({ email });

    if (!response) {
      res.status(400).json({ error: "Usuario nao encontrado com este email" });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({message: 'method errado'});
  }

}