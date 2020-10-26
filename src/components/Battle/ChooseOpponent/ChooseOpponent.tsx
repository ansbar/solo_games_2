import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setBattleStatus, setCurrentOpponent } from 'components/BattleOverview/CurrentBattleSlice'
import Button from 'components/Utils/Button/Button'
import { ICurrentBattleOpponents } from 'assets/interfaces'
import { EnumBattleStates } from 'assets/enums'

interface IChooseOpponentProps {
    opponents: ICurrentBattleOpponents[]
}

function ChooseOpponent(props: IChooseOpponentProps) {   
    const dispatch = useDispatch()

    useEffect(() => {
        // If only one opponent exists in the current battle we skip this phase and move on the next.
        if(props.opponents.length === 1)
            setOpponentAndStatus(0)  
    })

    function opponentButton(opponent: ICurrentBattleOpponents, i:number){
        const disabled = opponent.hp <= 0
        return <Button className={"cta"} disabled={disabled} key={opponent.name} onClick={() => setOpponentAndStatus(i)} text={opponent.name} />
    }    

    function setOpponentAndStatus(opponent: number){
        dispatch(setCurrentOpponent(opponent))
        dispatch(setBattleStatus(EnumBattleStates.innerForce))        
    }

    return (
        <section>
            <h4>Choose opponent</h4>
            {props.opponents.map((opponent, i: number) => {
                return opponentButton(opponent, i)
            })}  
        </section>                
    )
}

export default ChooseOpponent