import { useEffect, useRef } from 'react'
import style from './style.module.scss'

export function Editor({file, changeContentFile}: any) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textAreaRef.current?.focus()
    }, [textAreaRef])

    return (
        <main className={style.editor}>
            <section className={style.editor__markdown}>
                <div>
                    <h2>MARKDOWN</h2>
                </div>
                <textarea
                    ref={textAreaRef}
                    value={file && file.content}
                    // onChange={(e) => {changeContentFile(e.target.value)}}
                />
            </section>
            
            
        </main>
    )
}