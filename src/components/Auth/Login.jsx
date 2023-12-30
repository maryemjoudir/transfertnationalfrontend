import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/authenticate', {
        email,
        password,
      });

      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

    } catch (error) {
      setEmail('');
      setPassword('');
      setError('Votre compte n\'est pas activé ou les informations sont incorrectes.');
    }
  };
  return (
    <>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="md:w-1/2 max-w-xl bg-white p-8 rounded-lg shadow-md border border-blue-100">
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <div className="text-center md:text-left">
              <label className="mr-1"> Sign in </label>
            </div>
          </div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Adresse e-mail"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Mot de passe"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
              onClick={handleLogin}
            >
              Connexion
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Vous n'avez pas de compte ?{" "}
            <a
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="#"
            >
              S'inscrire
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
