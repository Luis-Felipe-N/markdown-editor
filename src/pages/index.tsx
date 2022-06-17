import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { Preview } from "../components/Preview";
import { SideBar } from "../components/SideBar";

import { FileContext } from "../context/FileContext";

import style from "../style/pages/home.module.scss"

export function Home() {
    const [ loginModalIsOpen, setLoginModalIsOpen ]  = useState(false)
    const [ previewIsOpen, setPreviewIsOpen ]  = useState(false)
    
    const { fileId } = useParams()
    const { setNewFile, files } = useContext(FileContext)
    const navigate = useNavigate()

    useEffect(() => {
        setNewFile(fileId)
    }, [fileId])

    useEffect(() => {
        redirectToFile('init')
    }, [])

    function handleToggleLoginModal() {
        setLoginModalIsOpen(!loginModalIsOpen)
    }

    function redirectToFile(position?: string) {

        function redirect(fileId?: string) {
            if(fileId) {
                navigate(fileId, { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }

        if (position==='end') {
            const lastFile = files[files.length - 1]
            redirect(lastFile?.id)
            
        } else if (position==='init') {
            const fisrtFile = files[0]
            redirect(fisrtFile?.id)
        } else {
            redirect()
        }
    }

    return (
        <>
        <div className={style.home}>
            <SideBar 
                onToggleLoginMenu={handleToggleLoginModal}
                redirectToFile={redirectToFile}
            />
            <main>
                <Header 
                    onToggleLoginMenu={handleToggleLoginModal}
                    redirectToFile={redirectToFile}
                />
                <div className={previewIsOpen ? `${style.wrapper} ${style.previewOpen}` : style.wrapper}>
                    <button
                        className={style.btnToggleView}
                        onClick={() => setPreviewIsOpen(!previewIsOpen)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="currentColor" /></svg>
                    </button>
                    <div>
                        <Editor />
                    </div>
                    <div>
                    <Preview />
                    </div>
                </div>
            </main>
        </div>

        <LoginModal isOpen={loginModalIsOpen} onRequestClose={handleToggleLoginModal} />
        </>
    )
}