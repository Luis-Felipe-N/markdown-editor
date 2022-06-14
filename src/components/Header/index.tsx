import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FileContext } from "../../context/FileContext";
import style from "./style.module.scss";

// import { ReactComponent as Logo } from '../../assets/fileIcon.svg'

export function Header() {
  // const [documentName, setDocumentName] = useState("welcome.md");

  const { user, signIn } = useContext(AuthContext);
  const { file, saveChange, changeContentFile } = useContext(FileContext);
  const { id }  = useParams()

  function handleChangedocumentName(input: HTMLInputElement) {
    changeContentFile({name: input.value})
  }

  function handleSaveChanges() {
    if (user != null && id !== undefined) {
      saveChange(id)
    } else {
      signIn();
    }
  }

  return (
    <>
      <header className={style.header}>
        <h2>MARKDOWN</h2>

        <div className={style.documentName}>
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
          <div>
            <p>Nome do documento</p>
            <input
              type="text"
              onChange={(event) => handleChangedocumentName(event.target)}
              value={file?.name}
            />
          </div>
        </div>

        <div className={style.btns}>
            <div> 
                {user && (
                    <h2>{ user.name }</h2>
                )}
            </div>
          <button>
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
                d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                fill="currentColor"
              />
              <path d="M9 9H11V17H9V9Z" fill="currentColor" />
              <path d="M13 9H15V17H13V9Z" fill="currentColor" />
            </svg>
          </button>
          <button className={style.btnSave} onClick={handleSaveChanges}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 18H17V16H7V18Z" fill="currentColor" />
              <path d="M17 14H7V12H17V14Z" fill="currentColor" />
              <path d="M7 10H11V8H7V10Z" fill="currentColor" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                fill="currentColor"
              />
            </svg>
            Salver alterações
          </button>
        </div>
      </header>
    </>
  );
}
