import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Tooltip from 'components/Utils/Tooltip/Tooltip'
import Button from 'components/Utils/Button/Button'
import { setBattleStatus, setBattleModifiers } from 'components/BattleOverview/CurrentBattleSlice'
import { getPlayerInnerForce, decreaseInnerForce } from 'app/playerSlice';
import { getHelpTexts, getGeneralTexts } from 'app/LanguageSlice';
import { EnumAttackType, EnumBattleStates } from 'assets/enums'

interface IChooseOpponentProps {
    attackType: EnumAttackType
}

function InnerForce(props: IChooseOpponentProps) {   
    const dispatch = useDispatch()
    const helpTexts = useSelector(getHelpTexts) 
    const generalTexts = useSelector(getGeneralTexts) 
    const playerInnerForce = useSelector(getPlayerInnerForce) 

    useEffect(() => {
        // If player has no inner force left or attack type is a throw (where no actual damage is being made), go to next phase
        if(props.attackType === EnumAttackType.throw || playerInnerForce === 0)
            dispatch(setBattleStatus(EnumBattleStates.attack))        
    })

    /* Function setInnerForce
     * Some store dispatchs to adjust for use of inner force */
    function setInnerForce(useInnerForce: boolean){
        if(useInnerForce) dispatch(decreaseInnerForce()) // Remove one from inner force        
        dispatch(setBattleModifiers({"innerForce": useInnerForce})) // Add inner force to the battle modifiers so player can benifit from it in next attack   
        dispatch(setBattleStatus(EnumBattleStates.attack)) // Go to next phase (attack)
    }

    function helpText(){
        const tooltip = <Tooltip text={generalTexts.innerForce} helpText={helpTexts.innerForce} />
        return (
            <p>Vill du använda din {tooltip} i attacken ({playerInnerForce} kvar?)</p>
        )
    }

    return (
        <section>
            {helpText()}
            <Button onClick={() => setInnerForce(false)} text={"Nej"} className={"cta"} />
            <Button onClick={() => setInnerForce(true)} text={"Ja"} />
        </section>                
    )
}

export default InnerForce