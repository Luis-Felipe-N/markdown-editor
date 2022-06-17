import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { FileContext } from '../../context/FileContext'

import { createDoc } from '../../services/firebase'
import { createDocLocal } from '../../services/localStorage'
import { formatDate } from '../../utils/formatDate'
import style from './style.module.scss'

interface ISideBarrops {
    onToggleLoginMenu: () => void,
    redirectToFile: (position?: string) => void
}  

export function SideBar({ onToggleLoginMenu, redirectToFile }: ISideBarrops) {
    const [ sideBarIsClose, setSideBarIsClose ] = useState(false)

    const { user } = useContext(AuthContext)
    const { files, createNewDoc } = useContext(FileContext)

    function handleCloseSideBar() {
        setSideBarIsClose( currentState => !currentState)
    }

    async function handleCreateNewDoc() {
        if (user) {
            createNewDoc()
        } else {
            onToggleLoginMenu()
        }
        redirectToFile('end')
    }

    return (
        <aside 
            className={
                sideBarIsClose ? `${style.sidebar} ${style.open}` : style.sidebar
            }
        >
            <div>
                <header className={style.sidebarHeader}>
                    <h3>
                        Meus documentos

                    </h3>
                <button onClick={handleCreateNewDoc}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H13V4ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z"
                    fill="currentColor"
                    />
                </svg>
                    Novo
                </button>
                </header>
                <ul>
                    {files && files.map(file => (
                        <li key={file.id} title={file.name}>
                                <Link to={`/${file.id}`}>
                            <svg width="24" height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H13V4ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z"
                                fill="currentColor"
                                />
                            </svg>
                                <div>
                                    <span>{ file.created_at &&  formatDate( file.created_at) }</span>
                                    <p>{ file.name }</p>
                                </div>
                        </Link>
                            </li>
                    ))}
                </ul>
            </div>
            <button className={style.btnOpen} onClick={handleCloseSideBar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="currentColor" /><path d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z" fill="currentColor" /><path d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z" fill="currentColor" /></svg>
            </button>
        </aside>
    )
}   