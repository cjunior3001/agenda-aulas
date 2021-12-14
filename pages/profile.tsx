import { NextPage } from 'next';
import useSWR from 'swr';
import { signIn, signOut, useSession } from "next-auth/client";

import api from '../utils/api';
import Nav from '../components/nav';

const ProfilePage: NextPage = () => {
  const [session, loading] = useSession();

  const { data, error } = useSWR(`/api/user/${session?.user.email}`, api);

  if(error){
    console.log(error);
  }
  if(data){
    console.log(data);
    
  }

  return (
    <div>
      <Nav />
      {!session && (
        <div className="text-3xl">
          Favor fazer login pra acessar o Profile <br />
          <button onClick={() => signIn('auth0')}>Sign in</button>
        </div>
      )}
      {session && data && (
        <>
          <h1>Bem vindo a pagina Profile</h1>
          <div className="text-3xl">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <h1 className="text-3xl">{data.data.name}</h1>
          <h1 className="text-3xl">{data.data.coins} moedas</h1>
        </>
      )}
      {error && <h1>O usuario com email {session?.user.email} nao existe</h1>}
      {loading && (
        <div className="text-2xl">
          Carregando...
        </div>
      )}
    </div>
  )
}

export default ProfilePage;