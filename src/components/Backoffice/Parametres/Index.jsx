import React, { useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const IndexParametre = () => {
  const decoded = jwtDecode(localStorage.getItem('token'));
  const username = decoded ? decoded.sub : null;
  const [formData,setFormData]=useState({
    ancienpassword : '',
    password :'',
    confirmpassword :''   
  })

    //fonction pour changer etat des variable
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    //fonction pour submit data
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .put(`http://localhost:8081/api/v1/user/admin/udpate-password/${username}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
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
   
    <div className="min-h-full">
        <Sidebar />
        <ToastContainer />
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1">
        <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-xl font-bold text-gray-900">Modifier le mot de passe</h2>   
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="ancienpassword" className="block text-sm font-medium text-gray-700">
                    Ancien mot de passe:
                    </label>
                    <div className="mt-1">
                      <input
                        id="ancienpassword"
                        name="ancienpassword"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        placeholder='Entrer ancien mot de passe'
                        value={formData.ancienpassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Nouveau mot de passe:
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder='Entrer nouveau mot de passe'
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                    Confirmer le nouveau mot de passe:
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        autoComplete="current-password"
                        placeholder='Confirmer le nouveau mot de passe'
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Modifier
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      </main>
      </div>
      </div>
     
  )
}

export default IndexParametre