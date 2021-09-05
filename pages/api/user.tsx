import clientPromise from "../../utils/database";

export default async function helloAPI(req, res) {
  if (req.method === 'POST') {
    const { name, email, cellphone, teacher } = req.body;
    
    if (!name || !email || !cellphone || !teacher){
      res.status(400).json({message: 'Faltando nome, email, cellphone ou teacher'});
      return;
    }

    const client = await clientPromise;

    const db = client.db('teach-other');

    const response = await db
      .collection('users')
      .insertOne({
      name: name,
      email: email,
      cellphone: cellphone,
      teacher: teacher,
    });
  
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({message: 'method errado'});
  }

}