import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import axios from 'axios'
import { PencilAltIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/outline';

import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ITEMS_PER_PAGE = 7;

const IndexClients = () => {
  const [Clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const indexOfLastClient = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstClient = indexOfLastClient - ITEMS_PER_PAGE;
  const currentClients = Clients.slice(indexOfFirstClient, indexOfLastClient);
  const [showModal, setShowModal] = useState(false); // State to manage the modal visibility
  const [ClientToDelete, setClientToDelete] = useState(null); // State to store the Client to delete

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = currentClients.filter((Client) =>
    `${Client.name} ${Client.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDeleteClient = async (email) => {
    try {
      // Store the Client to delete and show the modal
      setClientToDelete(email);
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting Client:', error);
      toast.error('Error deleting Client. Please try again later.');
    }
  }

  const handleConfirmDelete = async () => {
    try {
      // Close the modal
      setShowModal(false);

      // Perform the deletion
      await axios.delete(`http://localhost:8081/api/v1/user/activate-vs-desactivate/${ClientToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the Clients list
      const updatedClients = Clients.filter((Client) => Client.email !== ClientToDelete);
      setClients(updatedClients);

      toast.success('le compte de ce client désactivé est avec succès!');
    } catch (error) {
      console.error('Error deleting Client:', error);
      toast.error('Error deleting Client. Please try again later.');
    }
  }

  const handleCancelDelete = () => {
    // Close the modal
    setShowModal(false);
    // Clear the ClientToDelete state
    setClientToDelete(null);
  }
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/user/admin/allClients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);

        setClients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Clients:', error);
      }
    };

    fetchClients();
  }, []);
  return (
    <>
      <div className="min-h-full">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col flex-1 bg-white shadow overflow-hidden sm:rounded-lg lg:pl-64 flex flex-col flex-1 ms-5 m-4">
          <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div>
                      <header>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <h5 className="text-3xl font-bold leading-tight text-gray-600">Liste des Clients</h5>
                        </div>
                      </header>
                      <main>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                          {/* Replace with your content */}
                          <div className="px-4 py-8 sm:px-0">
                            <div className="flex items-center mb-4 relative">
                              <label htmlFor="search" className="sr-only">
                                Chercher
                              </label>
                              <input
                                type="text"
                                id="search"
                                className="p-2 pl-8 appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                placeholder="Rechercher par nom"
                                value={searchTerm}
                                onChange={handleSearch}
                              />
                              <svg
                                className="absolute left-2 top-2 text-gray-400 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 21l-5.2-5.2"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                                ></path>
                              </svg>
                              <Link
                              to={"/admin/Clients/add"}
                                type="button"
                                className="inline-flex items-center ml-auto px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                              >
                                Ajouter Client
                              </Link>
                            </div>
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Code Client
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Nom
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      E-mail
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      N° GSM
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Solde
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                      Ville
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                      Adresse
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                      Statut
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                      Action
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                      <span className="sr-only">Edit</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {filteredClients.map((Client) => (
                                    <tr key={Client.id}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <div className="font-medium text-gray-900">{Client.nidentity}</div>

                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <div className="text-gray-900">{Client.name} {Client.lastname} </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                              {Client.email}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{Client.gsm} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{Client.montant} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{Client.ville} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-green-800">
                                          {Client.adresseLegale}
                                        </span>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${Client.estActiver ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                          }`}>
                                          {Client.estActiver ? 'Activer' : 'Désactiver'}
                                        </span>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {/* Add the view, edit, and delete icons with onClick handlers */}
                                        <div className="flex items-center">
                                          <Link className="text-green-600 hover:text-green-900" to={`/admin/client/detail/${Client.email}`}>
                                            <EyeIcon className="h-5 w-5" />
                                          </Link>
                                          <Link to={`/admin/client/update/${Client.email}`} className="text-blue-600 hover:text-blue-900 ml-2">
                                            <PencilAltIcon className="h-5 w-5" />
                                          </Link>
                                         

                                          <Link
                                            className={`text-red-600 hover:text-red-900 ml-2 ${!Client.estActiver ? 'cursor-not-allowed' : 'cursor-pointer'
                                              }`}
                                            onClick={() => Client.estActiver && handleDeleteClient(Client.email)}
                                          >
                                            {Client.estActiver ? (
                                              <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />
                                            ) : (
                                              <XCircleIcon className={`h-5 w-5 text-red-500 ml-2 ${!Client.estActiver ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => Client.estActiver && handleDeleteClient(Client.email)} />
                                            )}
                                          </Link>
                                        </div>
                                      </td>

                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">

                              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-sm text-gray-700">
                                  Affichage de <span className="font-medium">{indexOfFirstClient + 1}</span> à{' '}
                                    <span className="font-medium">{Math.min(indexOfLastClient, Clients.length)}</span> parmi{' '}
                                    <span className="font-medium">{Clients.length}</span> résultats
                                  </p>
                                </div>
                                <div>
                                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {[...Array(Math.ceil(Clients.length / ITEMS_PER_PAGE)).keys()].map((number) => (
                                      <a
                                        key={number + 1}
                                        href="#"
                                        className={`${number + 1 === currentPage
                                          ? 'z-10 bg-cyan-50 border-cyan-500 text-cyan-600'
                                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                          } relative inline-flex items-center px-4 py-2 border text-sm font-medium `}
                                        onClick={() => paginate(number + 1)}
                                        style={{ borderRadius: '4px' }}
                                      >
                                        {number + 1}
                                      </a>
                                    ))}

                                  </nav>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p className="text-center text-lg font-semibold">
                  Vous êtes sûr de vouloir désactiver le compte ce client ?
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmDelete}
                >
                  Confirmer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelDelete}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default IndexClients