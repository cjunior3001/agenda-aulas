import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import { signIn, signOut, useSession } from "next-auth/client";

import api from '../utils/api';
import Nav from '../components/nav';

const ProfilePage: NextPage = () => {
  const [isTeacher, setIsTeacher] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [courses, setCourses] = useState("");
  const [availableLocations, setAvailableLocations] = useState("");
  /* const [availableHours, setAvailableHours] = useState(""); */
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [loggedWithoutAccount, setLoggedWithoutAccount] = useState(false);

  const [session, loading] = useSession();

  const { data, error } = useSWR(!loggedWithoutAccount && !loading ? `/api/user/${session?.user.email}` : null, api);

  /* o error aqui vai disparar o useEffect */
  useEffect(() => {
    if(error) setLoggedWithoutAccount(true);
  }, [error])

  const handleSubmit= () => {
      event.preventDefault();

      const data = {
        name,
        email,
        cellphone,
        courses: courses.split(",").map(item => item.trim()),
        availableLocations: availableLocations.split(",").map(item => item.trim()),
      }

      console.log(data);
      
  }

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
      {loggedWithoutAccount && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">O usuario com email {session?.user.email} nao existe</h1>
          <h1 className="text-2xl">Favor efetuar seu cadastro</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" 
              value={name} 
              onChange={(e) => {
                setName(e.target.value);              
              }} 
              placeholder="Full name" 
              className="bg-pink-200 my-3"
            />
            <input type="email"            
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);              
              }} 
              placeholder="E-mail" 
              className="bg-pink-200 my-3" 
            />
            <input type="cellphone" 
              value={cellphone} 
              onChange={(e) => {
                setCellphone(e.target.value);              
              }} 
              placeholder="Cellphone" 
              className="bg-pink-200 my-3" 
            />
            <div className="my-4">
              <h1>Deseja ser professor?</h1>
              <div className="bg-green-400 cursor-pointer my-2" onClick={() => setIsTeacher(true)}>Sim</div>
              <div className="bg-red-400 cursor-pointer" onClick={() => setIsTeacher(false)}>Não</div>
            </div>
            {/* se for professor aparece os campos abaixo */}
            {
              isTeacher &&(
                <>
                  <h1>Escreva suas materias</h1>
                  <input type="text" 
                    value={courses} 
                    onChange={(e) => {
                      setCourses(e.target.value);              
                    }} 
                    placeholder="Materias" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Local da aula</h1>
                  <input type="text" 
                    value={availableLocations} 
                    onChange={(e) => {
                      setAvailableLocations(e.target.value);              
                    }} 
                    placeholder="Ex: faculdade, remoto" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Escreva os horarios:</h1>
                  <h1>Segunda</h1>
                  <input type="text" 
                    value={monday} 
                    onChange={(e) => {
                      setMonday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Terça</h1>
                  <input type="text" 
                    value={tuesday} 
                    onChange={(e) => {
                      setTuesday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Quarta</h1>
                  <input type="text" 
                    value={wednesday} 
                    onChange={(e) => {
                      setWednesday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                    />
                  <h1>Quinta</h1>
                  <input type="text" 
                    value={thursday} 
                    onChange={(e) => {
                      setThursday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Sexta</h1>
                  <input type="text" 
                    value={friday} 
                    onChange={(e) => {
                      setFriday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                </>
              )
            }
            {
              isTeacher === false &&(
                <h1 className='my-2'>Beleza, pode criar seu perfil!</h1>
              )
            }

            <button className="bg-blue-200" type="submit">Criar Perfil</button>
          </form>
        </div>
      )}
      {loading && (
        <div className="text-2xl">
          Carregando...
        </div>
      )}
    </div>
  )
}

export default ProfilePage;