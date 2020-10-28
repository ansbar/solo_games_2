import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import diceRoll from '../../DiceRoll/DiceRoll'
import Tooltip from 'components/Utils/Tooltip/Tooltip'
import Button from 'components/Utils/Button/Button'
import { setBattleModifiers } from 'components/BattleOverview/CurrentBattleSlice'
import { getHelpTexts } from 'app/LanguageSlice';

interface IProps {
    opponentName: string
    onBlock: any
    defense: number
}

function Block(props: IProps) {   
    const dispatch = useDispatch()
    const helpTexts = useSelector(getHelpTexts) 

    /* Function setBlock
     * Some store dispatchs to adjust for use of inner force */
    function setBlock(useBlock: boolean){
        let successfulBlock = false

        if(useBlock){
            const blockRoll = diceRoll("2T6")
            successfulBlock = blockRoll < props.defense
        }    

        dispatch(setBattleModifiers({"block": useBlock})) 
        props.onBlock({
            useBlock: useBlock,
            successfulBlock: successfulBlock
        })
    }

    function helpText(){
        const tooltip = <Tooltip text="blockera" helpText={helpTexts.block} />
        return <p>Vill du försöka {tooltip}?</p>
    }

    return (
        <section>
            <b>{props.opponentName} träffar!</b><br/>
            {helpText()}
            <Button onClick={() => setBlock(false)} text={"Nej"} className={"cta"} />
            <Button onClick={() => setBlock(true)} text={"Ja"} />
        </section>                
    )
}

export default Block