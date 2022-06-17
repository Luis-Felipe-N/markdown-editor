import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { FileContext } from '../../context/FileContext'

import { createDoc } from '../../services/firebase'
import { createDocLocal } from '../../services/localStorage'
import { formatDate } from '../../utils/formatDate'
import style from './style.module.scss'

interface ISideBarrops {
    onToggleLoginMenu: () => void;
}  

export function SideBar({ onToggleLoginMenu }: ISideBarrops) {
    const [ sideBarIsClose, setSideBarIsClose ] = useState(false)

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)
    const { files } = useContext(FileContext)

    function handleCloseSideBar() {
        setSideBarIsClose( currentState => !currentState)
    }

    function handleCreateNewDoc() {
        if (user) {
            if (!user.isUserLocal) {
                const newFile = createDoc(user.uid)
                // navigate(newFile.id, { replace: true });
            } else {
                const event = new Event('storage')
                const newFile = createDocLocal(user.uid)
                // navigate(newFile.id, { replace: true });
                window.dispatchEvent(event)
            }
        } else {
            onToggleLoginMenu()
        }
    }

    return (
        <aside 
            className={
                sideBarIsClose ? `${style.sidebar} ${style.close}` : style.sidebar
            }
        >
            <div>
                <h3>Meus documentos</h3>
                <button onClick={handleCreateNewDoc}>Novo documento</button>
                <ul>
                    {files && files.map(file => (
                        <Link to={`/${file.id}`}  key={file.id}>
                            <li>
                            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z" fill="#FFF"></path></svg>
                                <div>
                                    <span>{ file.created_at &&  formatDate( file.created_at) }</span>
                                    <p>{ file.name }</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <button className={style.btnOpen} onClick={handleCloseSideBar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="currentColor" /><path d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z" fill="currentColor" /><path d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z" fill="currentColor" /></svg>
            </button>
        </aside>
    )
}   