import style from './style.module.scss'

interface IPreviewProps {
    text: string;
}

export function Preview({text}: IPreviewProps) {
    return (
        <section className={style.preview}>
            <div>
                <h2>PREVIEW</h2>
            </div>
        </section>
    )
}