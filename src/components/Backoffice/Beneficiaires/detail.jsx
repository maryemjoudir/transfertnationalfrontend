import React, { useEffect, useState } from 'react';
import Sidebar from '../../../layout/Sidebar';
import { useParams } from 'react-router';
import axios from 'axios';

const DetailBeneficiaire = () => {
  const { username, gsm } = useParams();
  const [beneficiaryData, setBeneficiaryData] = useState(null);

  useEffect(() => {
    const fetchBeneficiaryData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/beneficiaires/beneficiaires/getByPhoneAndUsername/${gsm}/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBeneficiaryData(response.data[0]); 
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du bénéficiaire:', error);
      }
    };
    fetchBeneficiaryData();
  }, [username, gsm]);

  return (
    <>
      <div className="min-h-full">
        <Sidebar />
        {beneficiaryData && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:pl-64 flex flex-col flex-1 ms-5 m-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{`${beneficiaryData.nom} ${beneficiaryData.prenom}`}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Nom</dt>
                  <dd className="mt-1 text-sm text-gray-900">{beneficiaryData.nom}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Prénom</dt>
                  <dd className="mt-1 text-sm text-gray-900">{beneficiaryData.prenom}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">N° Téléphone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{beneficiaryData.numeroGsm}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Piece d'Identité</dt>
                  <dd className="mt-1 text-sm text-gray-900">{beneficiaryData.pieceIdentity}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailBeneficiaire;
