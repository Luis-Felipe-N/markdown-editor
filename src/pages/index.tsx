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
    
    const { id } = useParams()
    const { setNewFile, files } = useContext(FileContext)
    const navigate = useNavigate()


    function handleToggleLoginModal() {
        setLoginModalIsOpen(!loginModalIsOpen)
    }

    useEffect(() => {
        setNewFile(id)
    }, [id])

    useEffect(() => {
        console.log('loop')
        const lastFile = files[files.length - 1]
        if(lastFile) {
            navigate(lastFile.id, { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    }, [files])


    return (
        <>
        <div className={style.home}>
            <SideBar onToggleLoginMenu={handleToggleLoginModal} />
            <main>
                <Header onToggleLoginMenu={handleToggleLoginModal} />
                <div className={style.wrapper}>
                    <Editor />
                    <Preview />
                </div>
            </main>
        </div>

        <LoginModal isOpen={loginModalIsOpen} onRequestClose={handleToggleLoginModal} />
        </>
    )
}