import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { IChoice } from 'assets/interfaces'
import { setCurrentPage } from './ChoicesSlice';
import { getCurrentBattle } from 'components/BattleOverview/CurrentBattleSlice'

import styles from './Choices.module.scss'
import { getPlayerAbilities } from 'app/playerSlice';
import { EnumBattleStates } from 'assets/enums';

interface IChoicesProps {
    abilitiesTexts: {
        [index: string]: string
    }
    choicesTexts?: string[]
    choices?: IChoice[]
}

function Choices(props: IChoicesProps) {   
    const player_abilities = useSelector(getPlayerAbilities) 
    const currentBattle = useSelector(getCurrentBattle)
    const dispatch = useDispatch();

    // Creates a choice link/button
    function createLink(choice: IChoice, index: number){            
        let linkText = (props.choicesTexts) ? props.choicesTexts[index] : ""
            linkText += (choice.ability) ? " (" + props.abilitiesTexts[choice.ability] + ")" : ""
        let link = <span>{linkText}</span> //        

        // Show a link (button) if no attribute requirement exists or if its fullfilled
        if (!choice.ability || (choice.ability && player_abilities.hasOwnProperty(choice.ability)))
            link = <button className="link" onClick={() => dispatch(setCurrentPage(choice.goto))}>{linkText}</button>

        return <li key={index}>{link}</li>
    }

    if(currentBattle.state !== EnumBattleStates.none)
        return null

    if(!props.choices?.length)
        return <li>Du är död, börja om?</li>

    return (
        <section className={styles.choices}>
            <ul>                
                {props.choices?.map((choice, i: number) => {
                    return createLink(choice, i)
                })}
            </ul>
            <hr/>
        </section>                
    )
}

export default Choices