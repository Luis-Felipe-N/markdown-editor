import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import style from "../style/pages/home.module.scss"

export function Home() {
    return (
        <div className={style.home}>
            <SideBar />
            <main>
                <Header />
                <Editor />
            </main>
        </div>
    )
}