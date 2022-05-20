import style from './style.module.scss'

interface IButtonProps {
    text: string,
    isPrimary?: boolean,
}

export function Button(props: IButtonProps) {
    return (
        <button className={`${!props.isPrimary === false ? `${style.button} ${style.primary}` : style.button }`}>
            { props.text }
        </button>
    )
}