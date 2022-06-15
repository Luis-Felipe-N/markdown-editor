import { useContext, useEffect, useState } from 'react';
import { FileContext } from '../../context/FileContext';
import { markdown } from '../../utils/convertMarkdow';
import style from './style.module.scss'


export function Preview() {
    const [ htmlPreview, setHtmlPreview ] = useState('');

    const { file } = useContext(FileContext);

    useEffect(() => {
        if(file?.content) {
            const tempHtmlPreview = markdown(file.content)
            setHtmlPreview(tempHtmlPreview)
        }
    }, [file?.content])

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