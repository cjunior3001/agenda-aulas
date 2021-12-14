import { useState, useCallback } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/client"

import api from '../../utils/api'
import Nav from '../../components/nav';

const SearchPage: NextPage = () => {
  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState([]);
  const [session, loading] = useSession();

  const handleSearch = useCallback (()=>{
    api(`/api/search/${textInput}`).then((response)=> {
      const teachers = response.data;

      setData(teachers);

      console.log(teachers);
      
    });
  }, [textInput, setData]);

  return (
    <div>
      <Nav />

      {!session && (
        <div className="text-3xl">
          Not signed in <br />
          <button onClick={() => signIn('auth0')}>Sign in</button>
        </div>
      )}
      {session && (
        <>
          <h1>Bem vindo a pagina Search</h1>
          <div className="text-3xl">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <input 
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            type="text" 
            placeholder="Nome da materia"
            className="bg-pink-200"
          />
          <button type="submit" className="bg-blue-200" onClick={handleSearch}>Pesquisar</button>
          {data.length != 0 && data.map((teacher) => (
            <Link href={`/search/${teacher._id}`} key={teacher._id}>
              <a>
                 <h1 className="text-2xl">{teacher.name}</h1>
              </a>
            </Link>
          ))
          }
        </>
      )}
      {loading && (
        <div className="text-5xl">
          Carregando...
        </div>
      )}
    </div>
  )
}

export default SearchPage;