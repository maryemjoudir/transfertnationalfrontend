import React, { useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import { MoroccanCities } from '../enum/MoroccanCities';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { MailIcon } from '@heroicons/react/solid'
import { Switch } from '@headlessui/react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import logo from '../../../assets/images/logo.png';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddAgent = () => {
  const [enabled, setEnabled] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    email: '',
    password: '',
    ville: '',
    adresse: '',
    solde: 0,
    ngsm: '',
  });
  //fonction pour changer etat des variable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  //fonction pour submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    axios
      .post("http://localhost:8081/api/v1/user/admin/add-agent", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        toast.success("Félicitations ! Le compte agent a été enregistré avec succès.");
        if (enabled) {
          setPdf(true)
        }else{ 
          setFormData({
          code: '',
          nom: '',
          email: '',
          password: '',
          ville: '',
          adresse: '',
          solde: 0,
          ngsm: '',
        });}
       
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Une erreur inattendue s\'est produite.');
        }
      });
  };
  const cancel = (e) => {
    setFormData({
      code: '',
      nom: '',
      email: '',
      password: '',
      ville: '',
      adresse: '',
      solde: 0,
      ngsm: '',
    })
  }
  //une fonction de retour pour reourner au formulaire
  const retour = (e) => {
    setPdf(false)
    setFormData({
      code: '',
      nom: '',
      email: '',
      password: '',
      ville: '',
      adresse: '',
      solde: 0,
      ngsm: '',
    })
  }
//fonction pour générer un code automatiquement
  function generateRandomPassword(length) {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    const allCharacters = uppercaseLetters + lowercaseLetters + numbers;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      password += allCharacters.charAt(randomIndex);
    }

    return password;
  }

  const generateRandomPasswordClick = () => {
    const newPassword = generateRandomPassword(14); // Changer la longueur si nécessaire
    setFormData((prevFormData) => ({ ...prevFormData, password: newPassword }));
  };
  //telechaargeent du recu
  const [loader, setLoader] = useState(false);
  const generatePDF = async () => {
    const capture = document.getElementById('receipt');
    html2canvas(capture).then((canvas) => {
      setLoader(true);
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('recu.pdf');

    });
  };
  return (
    <>
      <div className="min-h-full">
        <Sidebar />
        <ToastContainer />
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1 pb-8">
            {/* ici je fais un test sur variable appeler pdf si pdf true j'affiche pdf si pdf false j'affiche formulaire pour remplir les infos */}
            {pdf ? (
              <div className="bg-white min-h-screen flex items-center justify-center">
                <div>
                  <div id="receipt" className="text-center">
                    <div class="h-[270mm] w-[210mm] p-12">
                      <div class="flex justify-between">
                        <div>
                          <p class="pb-2 text-4xl">TRANSFERTENSAS</p>
                          <p class="text-sm text-gray-400">46 000 Safi</p>
                          <p class="text-sm text-gray-400"> <span className='font-bold'> tel : </span> 06 00 00 00 00</p>
                        </div>
                        <div className='h-40 w-40'>
                          <img className='h-full w-full' src={logo} />
                        </div>
                      </div>
                      <div class="flex justify-between pt-16">
                        <div>
                          <p class="text-sm font-bold">DATE: <span class="pl-1 font-normal">{new Date().toLocaleDateString()}</span></p>
                        </div>
                        <div class="pl-2 text-right">
                          <p class="text-gray-400">AGENT</p>
                          <p class="font-bold">{formData.nom}</p>
                          <p class="text-sm">{formData.ville}</p>
                          <p class="text-sm">{formData.adresse}</p>
                        </div>
                      </div>
                      <div class="pt-16">
                        <table class="w-full table-auto text-sm">
                          <tbody>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Code</td>
                              <td class="text-right">{formData.code}</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Nom</td>
                              <td class="text-right">{formData.nom}</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Adresse E-mail</td>
                              <td class="text-right">{formData.email}</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Mot de passe</td>
                              <td class="text-right">{formData.password}</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Ville</td>
                              <td class="text-right">{formData.ville}</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Adresse</td>
                              <td class="text-right">{formData.adresse}</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Solde</td>
                              <td class="text-right">{formData.solde} $</td>
                            </tr>
                            <tr class="h-10 border-b-2">
                              <td className='font-bold text-left'>Numéro GSM</td>
                              <td class="text-right">{formData.ngsm}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="pt-16 text-sm">
                        <p>Nom de la banque: TransfertENSAS</p>
                        <p>IBAN: FR76BANK1234567890123456789</p>
                      </div>

                    </div>
                  </div>
                  <div className="flex py-4">
                    <button
                      type="button"
                      onClick={generatePDF}
                      className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      disabled={!(loader === false)}
                    >
                      {loader ? <span>Entrain de Téléchargement </span> : <span> Télécharger  </span>}
                    </button>
                    <button
                      onClick={retour}
                      className="mx-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              </div>
            ) : (

              <div className="space-y-6">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Informations de l'Agent</h3>
                        <p className="mt-1 text-sm text-gray-500">Assurez-vous que les informations spécifiques telles que le numéro de téléphone mobile (GSM), le code, ou l'adresse e-mail sont uniques et ne sont pas déjà associées à un autre agent.</p>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Code agent
                              </label>
                              <div className="mt-1">
                                <input
                                  placeholder='Entrer le code agent'
                                  id="code"
                                  name="code"
                                  type="number"
                                  min="0"
                                  autoComplete="code"
                                  required
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.code}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                Nom
                              </label>
                              <div className="mt-1">
                                <input
                                  placeholder='Entrer le nom'
                                  id="nom"
                                  name="nom"
                                  type="text"
                                  autoComplete="nom"
                                  required
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.nom}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-mail
                              </label>
                              <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>

                                <input
                                  placeholder='Entrer adresse email'
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  required
                                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                              </label>
                              <div className="mt-1 flex">
                                <input
                                  placeholder='Entrer le mot de passe agent'
                                  id="password"
                                  name="password"
                                  type="text"
                                  autoComplete="password"
                                  required
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                                <button
                                  type="button"
                                  onClick={generateRandomPasswordClick}
                                  className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                  Générer
                                </button>
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                                Ville
                              </label>
                              <select
                                id="ville"
                                name="ville"
                                autoComplete="ville"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                value={formData.ville}
                                onChange={handleChange}
                              >
                                <option disabled>
                                  Sélectionnez une ville
                                </option>
                                {Object.keys(MoroccanCities).map((city, index) => (
                                  <option key={index} value={MoroccanCities[city]}>
                                    {MoroccanCities[city]}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="ngsm" className="block text-sm font-medium text-gray-700">
                                N° GSM
                              </label>
                              <div className="mt-1">
                                <PhoneInput
                                  id="ngsm"
                                  name="ngsm"
                                  autoComplete="ngsm"
                                  country={"ma"}
                                  type="tel"
                                  required
                                  className="number appearance-none block w-full placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.ngsm}
                                  onChange={(value) =>
                                    setFormData((prevFormData) => ({ ...prevFormData, ngsm: value }))}
                                />

                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                                Adresse
                              </label>
                              <div className="mt-1">
                                <input
                                  placeholder='Entrer adresse agent'
                                  id="adresse"
                                  name="adresse"
                                  type="text"
                                  autoComplete="adresse"
                                  required
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.adresse}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="solde" className="block text-sm font-medium text-gray-700">
                                Solde
                              </label>
                              <div className="mt-1  relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                  placeholder='Entrer solde agent'
                                  id="solde"
                                  name="solde"
                                  type="number"
                                  min="0"
                                  autoComplete="solde"
                                  required
                                  className="pl-7 pr-12 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={formData.solde}
                                  onChange={handleChange}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    MAD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Switch.Group as="div" className="flex items-center pt-4">
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={classNames(
                                enabled ? 'bg-cyan-600' : 'bg-gray-200',
                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                              )}
                            >
                              <span className="sr-only">Use setting</span>
                              <span
                                className={classNames(
                                  enabled ? 'translate-x-5' : 'translate-x-0',
                                  'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                )}
                              >
                                <span
                                  className={classNames(
                                    enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                                    'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                                  )}
                                  aria-hidden="true"
                                >
                                  <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                    <path
                                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span
                                  className={classNames(
                                    enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                                    'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                                  )}
                                  aria-hidden="true"
                                >
                                  <svg className="h-3 w-3 text-cyan-600" fill="currentColor" viewBox="0 0 12 12">
                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                  </svg>
                                </span>
                              </span>
                            </Switch>
                            <Switch.Label as="span" className="ml-3">
                              <span className="text-sm font-medium text-gray-900">Télécharger PDF</span>
                            </Switch.Label>
                          </Switch.Group>

                          <div className="flex justify-end pt-4">
                            <button
                              type="button"
                              onClick={cancel}
                              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                              Enregistrer
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default AddAgent