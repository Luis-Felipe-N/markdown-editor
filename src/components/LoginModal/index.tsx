import ReactModal from 'react-modal'
import style from "./style.module.scss";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface ILoginProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export function LoginModal({ isOpen, onRequestClose}: ILoginProps) {
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')

    const { createUserLocal, signIn } = useContext(AuthContext);

    function handleCreateLocalUser(e: Event) {
        e.preventDefault()

        createUserLocal(username, avatar)

        onRequestClose()
    }

    function handleLoginGoogle() {
        signIn()
        onRequestClose()
    }

    function hangleChangeUserName(text: string) {
        setUsername(text)
    }

    function hangleChangeAvatar(text: string) {
        setAvatar(text)
    }

    ReactModal.setAppElement('#root')

    return (
        <ReactModal
            closeTimeoutMS={200}
            isOpen={isOpen}
            contentLabel="Modal de Login"
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <div className={style.loginModal}>
                <button
                    onClick={onRequestClose}
                    className='closeModal'>X</button>
                <div className={style.loginGoogle}>
                    <h2>Faça login</h2>
                    <p>Login com google permite acessar seus arquivos em outros aparelhos</p>
                    <button onClick={handleLoginGoogle}>Login com google

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="currentColor" /></svg>
                    </button>
                </div>
                <p className={style.separator}>ou</p>
                <form className={style.localStorage} onSubmit={(e) => handleCreateLocalUser(e)}>
                    <h2>Armazenamento local</h2>
                    <p>Os arquivos só poreram ser acessado apartir deste navegador</p>
                    <input 
                        type="text" 
                        placeholder='Nome'
                        value={username}
                        onChange={(e) => hangleChangeUserName(e.target.value)}
                        />

                    <input 
                        type="url" 
                        placeholder='Link do avatar (opcional)'
                        value={avatar}
                        onChange={(e) => hangleChangeAvatar(e.target.value)}
                        />
                    <button>Salvar</button>
                </form>

            </div>
        </ReactModal>
    )
}