import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import diceRoll from '../../DiceRoll/DiceRoll'
import Tooltip from 'components/Utils/Tooltip/Tooltip'
import Button from 'components/Utils/Button/Button'
import { setBattleModifier } from 'components/BattleOverview/CurrentBattleSlice'
import { getHelpTexts } from 'app/LanguageSlice';
import { EnumBattleModifiers } from 'assets/enums'

interface IProps {
    opponentName: string
    onBlock: any
    defense: number
}

function Block(props: IProps) {   
    const dispatch = useDispatch()
    const helpTexts = useSelector(getHelpTexts) 

    /* Function setBlock
     * Some store dispatchs to adjust for use of block */
    function setBlock(useBlock: boolean){
        const blockRoll = "2T6"
        let successfulBlock = false
        let block = 0

        /* If player uses block we roll to see if succesful.
         * If so, toggle battle modifier */
        if(useBlock){
            block = diceRoll(blockRoll)
            console.log(block,props.defense)
            successfulBlock = block < props.defense               
        }    

        // Set block on battle modifier so we can adjust the attack chance in next attack phase
        dispatch(setBattleModifier({modifier: EnumBattleModifiers.block, value: true}))
        
        props.onBlock({
            useBlock: useBlock,
            successfulBlock: successfulBlock,
            blockRoll: blockRoll,
            block: block
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