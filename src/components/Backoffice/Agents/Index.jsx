import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import axios from 'axios'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ITEMS_PER_PAGE = 5;

const IndexAgents = () => {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const indexOfLastAgent = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstAgent = indexOfLastAgent - ITEMS_PER_PAGE;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
  const [showModal, setShowModal] = useState(false); // State to manage the modal visibility
  const [agentToDelete, setAgentToDelete] = useState(null); // State to store the agent to delete

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAgents = currentAgents.filter((agent) =>
    `${agent.name} ${agent.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDeleteAgent = async (email) => {
    try {
      // Store the agent to delete and show the modal
      setAgentToDelete(email);
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error('Error deleting agent. Please try again later.');
    }
  }

  const handleConfirmDelete = async () => {
    try {
      // Close the modal
      setShowModal(false);

      // Perform the deletion
      await axios.delete(`http://localhost:8081/api/v1/user/activate-vs-desactivate/${agentToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the agents list
      const updatedAgents = agents.filter((agent) => agent.email !== agentToDelete);
      setAgents(updatedAgents);

      toast.success('Agent supprimé avec succès!');
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error('Error deleting agent. Please try again later.');
    }
  }

  const handleCancelDelete = () => {
    // Close the modal
    setShowModal(false);
    // Clear the agentToDelete state
    setAgentToDelete(null);
  }
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/user/admin/allAgents', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);

        setAgents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des agents:', error);
      }
    };

    fetchAgents();
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
                          <h5 className="text-3xl font-bold leading-tight text-gray-600">Liste des agents</h5>
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
                              to={"/admin/agents/add"}
                                type="button"
                                className="inline-flex items-center ml-auto px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                              >
                                Ajouter Agent
                              </Link>
                            </div>
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Code agent
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
                                  {filteredAgents.map((agent) => (
                                    <tr key={agent.id}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <div className="font-medium text-gray-900">{agent.nidentity}</div>

                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <div className="text-gray-900">{agent.name} {agent.lastname} </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                              {agent.email}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{agent.gsm} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{agent.montant} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{agent.ville} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-green-800">
                                          {agent.adresseLegale}
                                        </span>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${agent.estActiver ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                          }`}>
                                          {agent.estActiver ? 'Activer' : 'Désactiver'}
                                        </span>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {/* Add the view, edit, and delete icons with onClick handlers */}
                                        <div className="flex items-center">
                                          <Link to={`/admin/agent/update/${agent.email}`} className="text-blue-600 hover:text-blue-900 ml-2">
                                            <PencilAltIcon className="h-5 w-5" />
                                          </Link>
                                          <Link
                                            className={`text-red-600 hover:text-red-900 ml-2 ${!agent.estActiver ? 'cursor-not-allowed' : 'cursor-pointer'
                                              }`}
                                            onClick={() => agent.estActiver && handleDeleteAgent(agent.email)}
                                          >
                                            <TrashIcon className={`h-5 w-5 ${!agent.estActiver ? 'text-gray-500' : ''}`} />
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
                                    Showing <span className="font-medium">{indexOfFirstAgent + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(indexOfLastAgent, agents.length)}</span> of{' '}
                                    <span className="font-medium">{agents.length}</span> results
                                  </p>
                                </div>
                                <div>
                                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {[...Array(Math.ceil(agents.length / ITEMS_PER_PAGE)).keys()].map((number) => (
                                      <a
                                        key={number + 1}
                                        href="#"
                                        className={`${number + 1 === currentPage
                                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                          } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                        onClick={() => paginate(number + 1)}
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
                  Vous êtes sûr de vouloir supprimer cet agent ?
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

export default IndexAgents