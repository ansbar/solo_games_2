import React from 'react';

import './Button.module.scss'
import styles from './Button.module.scss'

interface ITextProps {
    text: string
    className?: string
    onClick: any
    disabled?: boolean
}

function Button(props: ITextProps) {
    return (
        <button disabled={props.disabled} className={styles[props.className || ""]} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button;
