import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { Preview } from "../components/Preview";
import { SideBar } from "../components/SideBar";

import { FileContext } from "../context/FileContext";

import style from "../style/pages/home.module.scss"

export function Home() {
    const [ loginModalIsOpen, setLoginModalIsOpen ]  = useState(false)

    function handleToggleLoginModal() {
        setLoginModalIsOpen(!loginModalIsOpen)
    }

    const { id } = useParams()
    const { setNewFile } = useContext(FileContext)

    useEffect(() => {
        setNewFile(id)
    }, [id])

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