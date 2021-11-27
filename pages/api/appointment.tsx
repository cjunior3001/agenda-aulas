import { getSession } from "next-auth/client";
import clientPromise from "../../utils/database";
import { ObjectID } from "mongodb";

export default async function helloAPI(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const { date, teacher_name, teacher_id, student_name, student_id, course, location} = req.body;
    // console.log(teacher);
    // console.log(teacher == null);

    if (!session){
      res.status(400).json({error: "Faca o login primeiro"});
      return;
    }
    if (!date || !teacher_name || !teacher_id || !student_name || !student_id || !course || !location){
      res.status(400).json({message: 'Faltando dados para cadastrar appointment'});
      return;
    }
    
    const client = await clientPromise;

    const db = client.db('teach-other');

    const teacherExists = await db.collection('users').findOne({ _id: new ObjectID(teacher_id) });

    if(!teacherExists){
      res.status(400).json({message: `Teacher ${teacher_name} com id ${teacher_id} nao exist para appointment`});
      return;
    }

    const studentExists = await db.collection('users').findOne({ _id: new ObjectID(student_id) });

    if(!studentExists){
      res.status(400).json({message: `Estudante ${student_name} com id ${student_id} nao exist para appointment`});
      return;
    }

    const appointment = {
      date, teacher_name, teacher_id, student_name, student_id, course, location,
    }

    //update informacaoes do teacher
    await db.collection('users').updateOne(
      { _id: new ObjectID(teacher_id) },
      { $push: { appointments: appointment}, $inc: { coins: 1}}
    );

    //update informacaoes do student
    await db.collection('users').updateOne(
      { _id: new ObjectID(student_id) },
      { $push: { appointments: appointment}, $inc: { coins: -1 }}
    );
  
    res.status(200).json(appointment);
  } else if (req.method === 'GET') {
    const { email } = req.body;

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