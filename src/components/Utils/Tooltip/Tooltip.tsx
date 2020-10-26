import React from 'react';
import styles from './Tooltip.module.scss'

interface IInfoIconProps {
    text: string
    helpText: string
}

function InfoIcon(props: IInfoIconProps) {
    return (
        <span className={styles.infoIcon}>
            {props.text}
            <span>{props.helpText}</span>
        </span>
    )
}

export default InfoIcon;
