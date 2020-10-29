import React from 'react';

import './Button.module.scss'
import styles from './Button.module.scss'

interface ITextProps {
    text: string
    className?: string
    onClick: any
    disabled?: boolean
}
//styles[props.className || styles.button]
function Button(props: ITextProps) {
    return (
        <button disabled={props.disabled} className={`${styles.button} ${styles[props.className || ""]}`} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button;
