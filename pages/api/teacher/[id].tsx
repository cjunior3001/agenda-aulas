import clientPromise from "../../../utils/database";
import { ObjectID } from "mongodb";

export default async function helloAPI(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: "falta id do teacher para consultar"});
      return;
    }

    const client = await clientPromise;

    const db = client.db('teach-other');

    const response = await db.collection('users').findOne({ _id: new ObjectID(id) });

    if (!response) {
      res.status(400).json({ error: "Teacher nao encontrado" });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({message: 'method errado'});
  }

}