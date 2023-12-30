import React from 'react'
import Sidebar from '../../../layout/Sidebar'
import { CheckCircleIcon, OfficeBuildingIcon } from '@heroicons/react/solid'
const IndexAgents = () => {
  const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
  ]
  return (
    <>
      <div className="min-h-full">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="flex-1 min-w-0">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            Good morning, Emilia Birch
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            <OfficeBuildingIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Duke street studio
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            <CheckCircleIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            Verified account
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Add money
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Send money
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Title
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Status
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Role
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {people.map((person) => (
                            <tr key={person.email}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">{person.name}</div>
                                    <div className="text-gray-500">{person.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">{person.title}</div>
                                <div className="text-gray-500">{person.department}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                  Edit<span className="sr-only">, {person.name}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default IndexAgents