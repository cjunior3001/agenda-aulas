import { signIn, signOut, useSession } from "next-auth/client"

export default function AppPage() {
  const [session, loading] = useSession()

  return (
    <>
      <h1>Bem vindo a pagina app</h1>
      {!session && (
        <div className="text-3xl">
          Not signed in <br />
          <button onClick={() => signIn('auth0')}>Sign in</button>
        </div>
      )}
      {session && (
        <div className="text-3xl">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {loading && (
        <div className="text-2xl">
          Carregando...
        </div>
      )}
    </>
  )
}