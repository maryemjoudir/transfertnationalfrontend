import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import axios from 'axios'
const ITEMS_PER_PAGE = 5;
const IndexBeneficiaires = () => {

  
  const [Beneficiaires, setBeneficiaires] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const indexOfLastBeneficiaire = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBeneficiaire = indexOfLastBeneficiaire - ITEMS_PER_PAGE;
  const currentBeneficiaire = Beneficiaires.slice(indexOfFirstBeneficiaire, indexOfLastBeneficiaire);
  const [searchCriteria, setSearchCriteria] = useState('id'); // Default search criteria
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const filteredBeneficiaires = currentBeneficiaire.filter((Beneficiaire) =>
    `${Beneficiaire[searchCriteria]}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchBeneficiaires = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/beneficiaires/getAllBeneficiares', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);

        setBeneficiaires(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Beneficiares:', error);
      }
    };

    fetchBeneficiaires();
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
                          <h5 className="text-3xl font-bold leading-tight text-gray-600">Liste des Bénéficiaires</h5>
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
                                placeholder={`Rechercher par ${searchCriteria}`}
                                value={searchTerm}
                                onChange={handleSearch}
                              />
                              <div className="relative">
                                <select
                                  className="p-2 pr-8 appearance-none block border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm ml-2"
                                  value={searchCriteria}
                                  onChange={handleSearchCriteriaChange}
                                >
                                  <option value="id">Id bénéficiare</option>
                                  <option value="nom">Nom</option>
                                  <option value="prenom">Prénom</option>
                                  <option value="numeroGsm">N° GSM</option>
                                  <option value="pieceIdentity">Numéro de pièce d'identité</option>
                                  {/* Add other search criteria options as needed */}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
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

                            </div>
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Id bénéficiare
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Nom
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Prénom
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      N° GSM
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                      Numéro de pièce d'identité
                                    </th>
                                    
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {filteredBeneficiaires.map((Beneficiaire) => (
                                    <tr key={Beneficiaire.id}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <div className="font-medium text-gray-900">{Beneficiaire.id}</div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                          <div className="">
                                            <div className="text-gray-900">{Beneficiaire.nom} </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                        <div className="text-gray-900">
                                              {Beneficiaire.prenom}
                                       
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{Beneficiaire.numeroGsm} </div>
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{Beneficiaire.pieceIdentity} </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                              {/* //la pagination */}
                              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-sm text-gray-700">
                                    Affichage de <span className="font-medium">{indexOfFirstBeneficiaire + 1}</span> à{' '}
                                    <span className="font-medium">{Math.min(indexOfLastBeneficiaire, Beneficiaires.length)}</span> parmi{' '}
                                    <span className="font-medium">{Beneficiaires.length}</span> résultats
                                  </p>
                                </div>
                                <div>
                                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                      onClick={() => paginate(currentPage - 1)}
                                      disabled={currentPage === 1}
                                      className={`${currentPage === 1
                                        ? 'pointer-events-none opacity-50 bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer'
                                        } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                      style={{ borderRadius: '4px' }}
                                    >
                                      Précédent
                                    </button>

                                    {[...Array(Math.min(3, Math.ceil(Beneficiaires.length / ITEMS_PER_PAGE))).keys()].map((number) => (
                                      <button
                                        key={number + 1}
                                        onClick={() => paginate(number + 1)}
                                        className={`${number + 1 === currentPage
                                          ? 'z-10 bg-cyan-50 border-cyan-500 text-cyan-600'
                                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer'
                                          } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                        style={{ borderRadius: '4px' }}
                                      >
                                        {number + 1}
                                      </button>
                                    ))}

                                    <button
                                      onClick={() => paginate(currentPage + 1)}
                                      disabled={currentPage === Math.ceil(Beneficiaires.length / ITEMS_PER_PAGE)}
                                      className={`${currentPage === Math.ceil(Beneficiaires.length / ITEMS_PER_PAGE)
                                        ? 'pointer-events-none opacity-50 bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer'
                                        } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                      style={{ borderRadius: '4px' }}
                                    >
                                      Suivant
                                    </button>
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
    </>
  )
}

export default IndexBeneficiaires
