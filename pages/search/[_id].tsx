import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


export default function teacherProfilePage({name, email, _id}):JSX.Element {
  return (
    <>
      <h1 className="text-3xl">Pagina do professor {name}</h1>
      <h1 className="text-2xl">Email {email}</h1>
      <h1 className="text-2xl">Id {_id}</h1>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const _id = context.query._id;

  const response = await axios.get(`http://localhost:3000/api/teacher/${_id}`);

  const teacher = response.data;

  return {
    props: teacher,
  }

}