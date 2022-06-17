import { useContext, useEffect, useRef } from 'react'
import { FileContext } from '../../context/FileContext';
import style from './style.module.scss'

export function Editor() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { file, saveChange, changeContentFile } = useContext(FileContext);

    function handleUpdateTextArea(value: string) {
        changeContentFile({content: value})
    }

    return (
        <section className={style.editor}>
            
                <div>
                    <h2>MARKDOWN</h2>
                </div>
                <textarea
                    onChange={(e) => {handleUpdateTextArea(e.target.value)}}
                    value={file?.content}
                />         
        </section>
    )
}