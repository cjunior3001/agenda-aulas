import clientPromise from "../../utils/database";

export default async function helloAPI(req, res) {
  if (req.method === 'POST') {
    const { name, email, cellphone, teacher, courses, available_hours, available_locations } = req.body;
    // console.log(teacher);
    // console.log(teacher == null);

    //check se o availablehours esta entre 7 e 20hs
    let invalidHour = false;
    for(const dayOfTheWeek in available_hours){
      available_hours[dayOfTheWeek].forEach((hour) => {
          if (hour < 7 || hour > 20){
            invalidHour = true;
            return;
          }
      })
    }
    if(invalidHour){
      res.status(400).json({message: 'Hora fora de 20 e 7'});
        return;
    }

    if (teacher == null || !teacher){
      // console.log("entrou aqui");
      
      if (!name || !email || !cellphone || teacher == null){
        res.status(400).json({message: 'Faltando nome, email, cellphone ou teacher'});
        return;
      }
    } else if (teacher){
      if (!name || !email || !cellphone || !courses || !available_hours || !available_locations){
        res.status(400).json({message: 'Faltando nome, email, cellphone, teacher, courses, available_hours ou available_locations'});
        return;
      }
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
      coins: 1,
      courses: courses || [], 
      available_hours: available_hours || {},
      available_locations: available_locations || [],
      reviews: [],
      appointments: [],
    });
  
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({message: 'method errado'});
  }

}