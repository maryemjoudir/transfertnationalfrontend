import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }

    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/auth/authenticate',
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem('token', token);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      const decoded = jwtDecode(token);
      const authority = decoded.authorities[0];

      setEmail('');
      setPassword('');
      toast.success('Connexion réussie!', { autoClose: 10000 });

      switch (authority) {
        case 'ADMIN':
          window.location.href = '/admin/dashboard';
          break;
        case 'AGENT':
          window.location.href = '/transfert';
          break;
        case 'CLIENT':
          window.location.href = '/client/dashboard';
          break;
        default:
          break;
      }
    } catch (error) {
      setEmail('');
      setPassword('');

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Une erreur inattendue s\'est produite.');
      }
    }
  };


  return (
    <>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-cyan-700">

        <div className="md:w-1/2 max-w-xl bg-white p-8 rounded-lg shadow-md border border-blue-100">
          <ToastContainer />
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Se connecter</h2>
          </div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <div className="mt-1">

            <input
              className="appearance-none mt-4 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="mt-1">
            <input
              className="appearance-none mt-4 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                  <input
                    className="mr-1"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <span>Se souvenir de moi</span>
                </label>
              </div>
            </div>

          </div>
          <div className="text-center md:text-left">
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-800 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              type="submit"
              onClick={handleLogin}
            >
              Connexion
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left ">
            Vous n'avez pas de compte ?{" "}
            <Link
              className="text-cyan-600 hover:underline hover:underline-offset-4"
              to={'/auth/register'}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
