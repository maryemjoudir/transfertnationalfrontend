import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/v1/auth/register", formData)
      .then((res) => {
        console.log(res);
        toast.success("Félicitations ! Votre compte a été enregistré avec succès. Vous pouvez maintenant vous connecter.");
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Une erreur inattendue s\'est produite.');
        }
      });
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cyan-700">
        <ToastContainer/>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscrivez-vous</h2>
        </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* add firstname */}
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <div className="mt-1">
                  <input
                    placeholder='Entrer votre prénom'
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="firstname"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* add lastname */}
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <div className="mt-1">
                  <input
                    placeholder='Entrer votre nom'
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="lastname"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* add email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="mt-1">
                  <input
                    placeholder='Entrer votre adresse email'
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* add password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  mot de passe
                </label>
                <div className="mt-1">
                  <input
                    placeholder='Entrer votre mot de passe'
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
        
                <div className="text-sm">
                  <Link to="/auth/login" className="font-medium text-cyan-600 hover:text-cyan-500">
                    Vous avez un compte ?,Login.
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-800 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register