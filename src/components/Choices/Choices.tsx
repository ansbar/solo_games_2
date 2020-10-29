import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { IChoice } from 'assets/interfaces'
import { setCurrentPage, getCurrentPage } from './ChoicesSlice';
import { getCurrentBattle, setBattleStatus } from 'components/BattleOverview/CurrentBattleSlice'

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
    const dispatch = useDispatch();
    const currentPage = useSelector(getCurrentPage)
    const player_abilities = useSelector(getPlayerAbilities) 
    const currentBattle = useSelector(getCurrentBattle)

    
    // If no choices exists on page, player is dead
    if (!props.choices?.length)
        return <li>Du är död, börja om?</li>


    // Hide choices in battle except in battlestate pending
    if (currentBattle.state !== EnumBattleStates.none && currentBattle.state !== EnumBattleStates.pending)
        return null


    /* Function createLink
     * @choice - 
     * @index - 
     * Creates a choice link button */
    function createLink(choice: IChoice, index: number){   
        if(!props.choicesTexts){
            console.error("Missing choicetext for " + currentPage)
            return null
        }
        console.log(choice, index)
        
        const linkText = props.choicesTexts[index]
        let link = <span>{linkText}</span>

        // Show a link (button) IF no attribute requirement exists or if its fullfilled
        if (!choice.ability || (choice.ability && player_abilities.hasOwnProperty(choice.ability))){
            link = (
                // If player tries to go to the same page again in battle, we switch battle state to first
                <button className="link" onClick={() => (currentPage === choice.goto) ? dispatch(setBattleStatus(EnumBattleStates.chooseOpponent)) : dispatch(setCurrentPage(choice.goto))}>
                    {linkText}
                    {choice.ability ? " (" + props.abilitiesTexts[choice.ability] + ")" : ""}
                </button>
            )
        }            

        return <li key={choice.goto}>{link}</li>
    }


    return (
        <section className={styles.choices}>
            <ul>                
                {props.choices?.map((choice, i: number) => {
                    return createLink(choice, i)
                })}
            </ul>
        </section>                
    )
}

export default Choices