import { useEffect, useState } from 'react';
import { markdown } from '../../style/utils/convertMarkdow';
import style from './style.module.scss'

interface IPreviewProps {
    text: String;
}

export function Preview({text}: IPreviewProps) {
    const [ htmlPreview, setHtmlPreview ] = useState<String>();

    useEffect(() => {
        const tempHtmlPreview = markdown(text)
        setHtmlPreview(tempHtmlPreview)
    }, [text])

    return (
        <section className={style.preview}>
            <div>
                <h2>PREVIEW</h2>
            </div>
            <div>
                { htmlPreview }
            </div>
        </section>
    )
}