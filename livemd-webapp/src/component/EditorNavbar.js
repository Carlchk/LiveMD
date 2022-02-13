
import { useAuth0 } from "@auth0/auth0-react";
import { useState, Fragment } from "react"
import { ShareIcon, PencilIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import DocumentNameEditor from './DocumentNameEditor'

function EditorNavbar({ documentName, setDocumentName, onlineUser }) {

    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    const [docNameModalOpen, setDocNameModalOpen] = useState(false)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <div>
            <nav class="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow ">
                <div class="px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class=" flex items-center" onClick={() => (setDocNameModalOpen(!docNameModalOpen))}>
                            <a class="flex-shrink-0">
                                {documentName}
                            </a>
                        </div>
                        <div class="block">
                            <div class="ml-4 flex items-center md:ml-6"></div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="flex -space-x-2 overflow-hidden mr-4">
                                {onlineUser?.map((e) => {
                                    return <img
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src={e.user_pic}
                                        alt=""
                                    />
                                })}
                            </div>
                            <button type="button" class="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-800" type="button" data-modal-toggle="defaultModal">
                                <ShareIcon className="h-5 w-5 mr-2" />
                                <a className="font-bold">Share</a>
                            </button>
                            <a href="#" class="block relative">
                                {isAuthenticated ? <>
                                    <Menu as="div" className="ml-3 relative z-50">
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
                                </> : <></>}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <DocumentNameEditor open={docNameModalOpen} setOpen={setDocNameModalOpen} setDocumentName={setDocumentName} documentName={documentName} />
        </div>
    )
}

export default EditorNavbar;