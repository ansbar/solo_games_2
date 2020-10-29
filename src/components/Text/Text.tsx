import React from 'react';
import { useSelector } from 'react-redux'

import { getMainText } from 'app/LanguageSlice'

function Text() {
    const txt = useSelector(getMainText)
    const textArray = txt.split('\n');

    return (
        <section>
            {textArray.map((value, index) => {
               return <p key={index}>{value}</p>
            })}
        </section>
    )
}

export default Text;
