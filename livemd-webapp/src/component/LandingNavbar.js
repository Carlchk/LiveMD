
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './loginBtn'
import React, { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Logo from './Logo.svg'

import { Fragment } from 'react'

function Navbar() {
    const { user, isAuthenticated, isLoading,logout } = useAuth0();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent ">
            <nav className="shadow ">
                <div className="px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className=" flex items-center">
                            <a className="flex-shrink-0" href="/">
                                <img src={Logo} alt="LiveMD" className="h-8" />
                            </a>
                        </div>
                        <div className="block">
                            <div className="ml-4 flex items-center md:ml-6"></div>
                        </div>
                        <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0">
                            <a href="#" className="block relative">
                                {isLoading ? <>Loading...</> : isAuthenticated ? <>
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="bg-blue-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user.picture}
                                                    alt=""
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
                                                        <a href="#" className={classNames(active ? 'bg-blue-400' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-blue-400' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-blue-400' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={() => logout({ returnTo: window.location.origin })}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </> : <LoginButton />}
                            </a>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div >
                <div className="md:hidden">
                    {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Home
                        </a>
                        <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Gallery
                        </a>
                        <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Content
                        </a>
                        <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Contact
                        </a>
                    </div> */}
                    <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <a href="#" className="block relative">
                            {isAuthenticated ? <img alt="profil" src={user.picture} className="mx-auto object-cover rounded-full h-10 w-10 " /> : <></>}
                        </a>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar;