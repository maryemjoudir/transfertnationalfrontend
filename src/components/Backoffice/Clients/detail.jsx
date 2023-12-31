import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import { useParams } from 'react-router';
import axios from 'axios';
import { UserCircleIcon  } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';


const DetailClient = () => {
  const { username } = useParams();
  const [clientData, setClientData] = useState(null);
  const [beneficiaires, setBeneficiaires] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Effectuer la requête API pour récupérer les données du client
        const response = await axios.get(`http://localhost:8081/api/v1/user/get/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setClientData(response.data);

        // Ajouter une requête pour récupérer les bénéficiaires
        const beneficiairesResponse = await axios.get(`http://localhost:8081/api/v1/user/get-allbeneficiaire-of-client/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBeneficiaires(beneficiairesResponse.data);

        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du client:', error);
      }
    };

    // Appeler la fonction fetchClientData lors du montage du composant
    fetchClientData();
  }, [username]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <>
      <div className="min-h-full">
        <Sidebar />
        {clientData && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:pl-64 flex flex-col flex-1 ms-5 m-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{`${clientData.name} ${clientData.lastname}`}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">N° Identité</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.nidentity}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Nom et prénom</dt>
                  <dd className="mt-1 text-sm text-gray-900">{`${clientData.name} ${clientData.lastname}`}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.email}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">N° Téléphone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.gsm}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date de Naissance</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(clientData.dateNaissance)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Solde</dt>
                  <dd className="mt-1 text-sm text-gray-900">{`${clientData.montant} DH`}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Ville</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.ville}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.adresseLegale}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Nationalité</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.paysNationalite}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Emission de pays</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.paysEmission}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Type de piéce d'identité</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.typePieceIdentity}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Profession</dt>
                  <dd className="mt-1 text-sm text-gray-900">{clientData.profession}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date d'expération de la piece</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(clientData.dateExpirationPiece)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Validité de la piece</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(clientData.validitePieceIdentite)}</dd>
                </div>
                <div className="sm:col-span-3">
                  <dt className="text-sm font-medium text-gray-500">Bénéficiaires</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                      {beneficiaires.map((beneficiaire) => (
                        <Link
                          to={`/admin/beneficiaire/detail/${beneficiaire.numeroGsm}/${clientData.email}`}
                          key={beneficiaire.id}
                          className="relative rounded-lg border border-gray-300 bg-white px-3 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <div className="flex-shrink-0">
                            <UserCircleIcon  className="h-10 w-10 text-gray-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <a href="#" className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-sm font-medium text-gray-900">{beneficiaire.nom}</p>
                              <p className="text-sm text-gray-500 truncate">{beneficiaire.numeroGsm}</p>
                            </a>
                          </div>
                        </Link>
                      ))}
                    </div>

                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DetailClient