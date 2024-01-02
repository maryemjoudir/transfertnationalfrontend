import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from "@heroicons/react/outline"
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid"
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
    return (
        <>
            <div className="flex-1 px-4 flex justify-between sm:px-6  lg:mx-auto lg:px-8 shadow" >
                <div className="flex-1 flex">
                    <form className="w-full flex md:ml-0" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                                id="search-field"
                                name="search-field"
                                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                                placeholder="Search transactions"
                                type="search"
                            />
                        </div>
                    </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                <div
                                    className="h-8 w-8 rounded-full text-gray-700"
                                >
                                    <AiOutlineUser className="mr-4 flex-shrink-0 h-6 w-6 text-gray-500" aria-hidden="true" />
                                  
                                </div>
                                <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                    <span className="sr-only">Open user menu for </span>
                                </span>
                                <ChevronDownIcon
                                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/admin/parametre"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Paramètre
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Logout
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    )
}

export default Navbar
