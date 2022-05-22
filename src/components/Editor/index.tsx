import { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { Preview } from '../Preview';
import style from './style.module.scss'

export function Editor() {
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
                />
            </section>
            
            <Preview />
        </main>
    )
}