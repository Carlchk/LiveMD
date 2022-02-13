import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import EditorNavbar from './component/EditorNavbar';
import Quill from "quill"
import QuillCursors from 'quill-cursors';
import "quill/dist/quill.snow.css"
import MDEditor from '@uiw/react-md-editor';

import { io } from "socket.io-client"
import Spinner from "./component/Spinner";
import { useAuth0 } from "@auth0/auth0-react";

import { stringToColour } from "./util/utilities"

const SAVE_INTERVAL_MS = 1000

function Editor() {
    const { id: fileid } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    const [cursors, setCursors] = useState()

    const [mdvalue, setMDValue] = useState("")
    const [documentName, setDocumentName] = useState("")
    const [onlineUser, setOnlineUser] = useState([])


    const { isLoading, user } = useAuth0();

    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])


    useEffect(() => {
        if (socket == null || quill == null) return
        if (isLoading) return

        socket.once("load-document", (document) => {
            quill.setContents(document.data)
            setDocumentName(document.name)
            setMDValue(quill.getText())
            quill.enable()
        })

        socket.emit("get-document", { documentId: fileid, userData: user })
    }, [socket, quill, fileid])

    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit("save-document", { name: documentName, data: quill.getContents() })
            setMDValue(quill.getText())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = ({ onlineUser }) => {
            setOnlineUser(onlineUser)
        }
        socket.on("receive-changes-on-online-user", handler)
    }, [socket,quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = ({ delta, onlineUser }) => {
            quill.updateContents(delta)
            setMDValue(quill.getText())
            setOnlineUser(onlineUser)
        }
        socket.on("receive-changes", handler)

        return () => {
            socket.off("receive-changes", handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return
            socket.emit("send-changes", { delta })
            setMDValue(quill.getText())
        }
        quill.on("text-change", handler)

        return () => {
            quill.off("text-change", handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = ({ documentName, onlineUser }) => {
            setDocumentName(documentName)
            setOnlineUser(onlineUser)
        }
        socket.on("receive-document-name-changes", handler)

        return () => {
            socket.off("receive-document-name-changes", handler)
        }
    }, [socket, documentName])

    useEffect(() => {
        if (socket == null || quill == null) return
        socket.emit("send-document-name-changes", { documentName })
    }, [socket, documentName])

    useEffect(() => {
        if (socket == null || quill == null) return

        setMDValue(quill.getText())
    }, [quill, socket])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        Quill.register('modules/cursors', QuillCursors);
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: 'bubble',
            modules: {
                toolbar: false,
                cursors: {
                    transformOnTextChange: true,
                },
                keyboard: {
                    bindings: {
                        'list autofill': {
                            prefix: /^\s*()$/
                        }
                    }
                }
            },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return (
        <>{isLoading ? <><Spinner />Loading...</> : <>
            {/* <EditorNavbar docName={documentName} /> */}
            <EditorNavbar documentName={documentName} setDocumentName={setDocumentName} onlineUser={onlineUser} />
            <container class="grid grid-cols-2 gap-4 h-screen divide-x-2">
                <div className="container" ref={wrapperRef}></div>
                <container class="p-6">
                    <MDEditor.Markdown source={mdvalue} height={window.innerHeight} />
                </container>
            </container>

        </>}</>)
}

export default Editor;