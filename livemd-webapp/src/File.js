import { useEffect, useState } from "react"
import LandingNavbar from './component/LandingNavbar'
import Spinner from './component/Spinner'
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment'

export default function File() {
    const [files, setFiles] = useState()
    const [Loading, setLoading] = useState(true)
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    
    const domain = process.env.REACT_APP_AUTH0_DOMAIN
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        const getUserMetadata = async () => {
            

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                await fetch(`${SERVER_URL}/getDocument`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(res => res.json())
                    .then((data) => {
                        setFiles(data)
                        setLoading(false)
                    })
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    const computeLastUpdateState = (updatedAt) => {
        const hours = moment().diff(updatedAt, "H")
        var statement = ''
        if (hours === 0) {
            statement = "You edited the document just now"
        } else if (hours >= 1 && hours <= 23) {
            statement = `You edited this ${hours} hours ago`
        } else {
            statement = `You edited this ${Math.round(hours / 24)} days ago`
        }
        return statement
    }

    const rightclick = () => {
        var rightclick;
        var e = window.event;
        console.log(e)
        // if (e.which) rightclick = (e.which == 3);
        // else if (e.button) rightclick = (e.button == 2);
        // alert(rightclick); // true or false, you can trap right click here by if comparison
    }

    const DocumentCard = ({ title, _id, createdAt, updatedAt }) => {
        // document.addEventListener("contextmenu", ()=>{console.log(_id)});
        return (
            <div class="p-4">
                <a href={`/editor/${_id}`} class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:border-blue-600 hover:shadow-blue-500/50">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        Created at: {moment(createdAt).format('DD/MM/YYYY hh:mm')}
                    </p>
                    <p class="font-normal text-gray-400 dark:text-gray-400 mt-4">
                        {computeLastUpdateState(updatedAt)}
                    </p>
                </a>
            </div>
        )
    }

    const AddNewDocument = () => {
        return (
            <div class="p-4 text-center	">
                <a href={`/new`} class="block px-4 py-12 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 place-content-center hover:border-blue-600 hover:shadow-blue-500/50">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create New Document</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </p>

                </a>
            </div>
        )
    }

    if (Loading) return (<Spinner />)

    return (
        <>
            <div class="max-w-7xl mx-auto px-8 py-1">
                <p class="text-5xl dark:text-white m-4 py-6">Files</p>
                <div class="grid grid-cols-3 gap-4 ">
                    <AddNewDocument />
                    {files.map((e) => {
                        return <DocumentCard id={e._id} title={e.name} _id={e._id} createdAt={e.createdAt} updatedAt={e.updatedAt} onContextMenu={console.log(e._id)} />
                    })}
                </div>

                {/* {JSON.stringify(files)} */}
            </div>

        </>
    )


}