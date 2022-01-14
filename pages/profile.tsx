import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { signIn, signOut, useSession } from "next-auth/client";

import api from '../utils/api';
import Nav from '../components/nav';

const ProfilePage: NextPage = () => {
  const [isTeacher, setIsTeacher] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [cellphone, setCellphone] = useState(null);
  const [courses, setCourses] = useState(null);
  const [availableLocations, setAvailableLocations] = useState(null);
  /* const [availableHours, setAvailableHours] = useState(""); */
  const [monday, setMonday] = useState(null);
  const [tuesday, setTuesday] = useState(null);
  const [wednesday, setWednesday] = useState(null);
  const [thursday, setThursday] = useState(null);
  const [friday, setFriday] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [loggedWithoutAccount, setLoggedWithoutAccount] = useState(false);

  const [session, loading] = useSession();

  const { data, error } = useSWR(!loggedWithoutAccount && !loading ? `/api/user/${session?.user.email}` : null, api);

  /* o error aqui vai disparar o useEffect */
  useEffect(() => {
    setErrorCount((prevstate) => prevstate + 1);
    if(error && errorCount === 1) setLoggedWithoutAccount(true);
  }, [error, setErrorCount]);

  const handleSubmit = async () => {
      event.preventDefault();

      const available_hours = {
        monday: monday?.split(",").map(item => item.trim()).map((item) => parseInt(item)),
        tuesday: tuesday?.split(",").map(item => item.trim()).map((item) => parseInt(item)),
        wednesday: wednesday?.split(",").map(item => item.trim()).map((item) => parseInt(item)),
        thursday: thursday?.split(",").map(item => item.trim()).map((item) => parseInt(item)),
        friday: friday?.split(",").map(item => item.trim()).map((item) => parseInt(item)),
      }

      //se nao tiver hora para algum dia, deleta aquele dia
      for(const dayOfTheWeek in available_hours){
        if(!available_hours[dayOfTheWeek]) delete available_hours[dayOfTheWeek];
      }

      const data = {
        name,
        email,
        cellphone,
        courses: courses?.split(",").map(item => item.trim()),
        teacher: isTeacher,
        available_locations: availableLocations?.split(",").map(item => item.trim()),
        available_hours,
      }

      //console.log(data);
      let error;
      try {   
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user`, data);
        //se der tudo certo o usuario agora tem conta
        setLoggedWithoutAccount(false);
      } catch (err) {
        if(err.response){
          console.log(err.response.data);
          alert(err.response.data.message)
        }
      }      
      
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
      {loggedWithoutAccount && session && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">O usuario com email {session?.user.email} nao existe</h1>
          <h1 className="text-2xl">Favor efetuar seu cadastro</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" 
              value={name == null ? '' : name} 
              onChange={(e) => {
                setName(e.target.value);              
              }} 
              placeholder="Full name" 
              className="bg-pink-200 my-3"
            />
            <input type="email"            
              value={email == null ? '' : email} 
              onChange={(e) => {
                setEmail(e.target.value);              
              }} 
              placeholder="E-mail" 
              className="bg-pink-200 my-3" 
            />
            <input type="cellphone" 
              value={cellphone == null ? '' : cellphone} 
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
                    value={courses == null ? '' : courses} 
                    onChange={(e) => {
                      setCourses(e.target.value);              
                    }} 
                    placeholder="Materias" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Local da aula</h1>
                  <input type="text" 
                    value={availableLocations == null ? '' : availableLocations} 
                    onChange={(e) => {
                      setAvailableLocations(e.target.value);              
                    }} 
                    placeholder="Ex: faculdade, remoto" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Escreva os horarios:</h1>
                  <h1>Segunda</h1>
                  <input type="text" 
                    value={monday == null ? '' : monday} 
                    onChange={(e) => {
                      setMonday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Terça</h1>
                  <input type="text" 
                    value={tuesday == null ? '' : tuesday} 
                    onChange={(e) => {
                      setTuesday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Quarta</h1>
                  <input type="text" 
                    value={wednesday == null ? '' : wednesday} 
                    onChange={(e) => {
                      setWednesday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                    />
                  <h1>Quinta</h1>
                  <input type="text" 
                    value={thursday == null ? '' : thursday} 
                    onChange={(e) => {
                      setThursday(e.target.value);              
                    }} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-3" 
                  />
                  <h1>Sexta</h1>
                  <input type="text" 
                    value={friday == null ? '' : friday} 
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