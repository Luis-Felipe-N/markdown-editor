import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { Preview } from "../components/Preview";
import { SideBar } from "../components/SideBar";
import { FileContext } from "../context/FileContext";

import style from "../style/pages/home.module.scss"

export function Home() {

    const { id } = useParams()
    const { file, setNewFile } = useContext(FileContext)

    useEffect(() => {
        setNewFile(id)
    }, [id])

    return (
        <div className={style.home}>
            <SideBar />
            <main>
                <Header />
                <div className={style.wrapper}>
                    <Editor />
                    <Preview text={file?.content} />
                </div>
            </main>
        </div>
    )
}