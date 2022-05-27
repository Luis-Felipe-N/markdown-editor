import { DOMElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import { markdown } from '../../style/utils/convertMarkdow';
import style from './style.module.scss'

interface IPreviewProps {
    text: String;
}

export function Preview({text}: IPreviewProps) {
    const [ htmlPreview, setHtmlPreview ] = useState('<h1>oi</h1>');

    useEffect(() => {
        const tempHtmlPreview = markdown(text)

        setHtmlPreview(tempHtmlPreview)
    }, [text])

    return (
        <section className={style.preview}>
            <div className={style.preview__header}>
                <h2>PREVIEW</h2>
            </div>
            <div className={style.preview__main} dangerouslySetInnerHTML={{__html: htmlPreview}}>  
            </div>
        </section>
    )
}