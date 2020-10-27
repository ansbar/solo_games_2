import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import diceRoll from '../DiceRoll/DiceRoll'
import Button from 'components/Utils/Button/Button'
import { EnumBattleStates } from 'assets/enums'
import { IBattleHistoryRecord } from 'assets/interfaces'
import { getCurrentBattle, decreaseOpponentHP, setBattleStatus } from 'components/BattleOverview/CurrentBattleSlice'

interface IAttackProps {
    onSaveToHistory: any
    stillAliveText: string
}

function Attack(props: IAttackProps) {   
    const loadOnce = useRef(false)
    const dispatch = useDispatch()  
    const [content, setContent] = useState(<p></p>)      
    const defaultAttackChance = "2T6"
    const currentBattle = useSelector(getCurrentBattle)
    const currentOpponent = currentBattle.opponentlist[currentBattle.currentOpponent || 0]
    

    useEffect(() => {
        /* We only want the attack to be run once in every activation
         * We use useRef to handle this. We could instead have set useEffect with an empty dependency list:
         * useEffect(() => { .. },[])
         * But that would have created an lint error */
        if (!loadOnce.current) {
            console.log("Attack runs")
            doAttack()
            loadOnce.current = true;
        }
    })

    /* Function doAttack
     * Main track. We run this function once per activation */
    function doAttack(){        
        const attackRoll = diceRoll(defaultAttackChance)
        const defense = currentOpponent.opponent_defense
        const successfulAttack = attackRoll > defense
        const damage = (successfulAttack) ? diceRoll(currentOpponent.player_damage) : 0
        let damageText
        let hpLeft = calculateHpLeft(damage)

        // If the opponent where hit, role for damage and assign it.
        if(successfulAttack){     
            dispatch(decreaseOpponentHP(damage))  
            damageText = getDamageText(damage, hpLeft)
        }

        // Save to history. The function is in parent component
        props.onSaveToHistory({
            timeStamp: Date.now(),
            attacker: "Hämnaren",
            defender: currentOpponent.name,
            attackRoll: attackRoll,
            defense: defense,
            successful: successfulAttack,
            damageRoll: damage,
            damage: currentOpponent.player_damage,
            hp: hpLeft + "/" + currentOpponent.hpMax
        } as IBattleHistoryRecord)

        setContent(
            <div>
                {getHitOrMissText(successfulAttack)}
                <br/>{damageText}
                {getContinuation(hpLeft)}
            </div>
        )
    }

    /* Function getContinuation
     * What happends after the attack?
     * If there are opponents left alive we go to defend phase
     * If all are dead we continue the story */
    function getContinuation(hpLeft: number){
        if(areAllOpponentsDead(hpLeft))
            return <Button onClick={() => setBattleState(EnumBattleStates.win)} text={"Försvara dig"} className={"cta"} />
        
        return (
            <div>
                <br/>
                {props.stillAliveText}<br/>
                <p>
                    <Button onClick={() => setBattleState(EnumBattleStates.defend)} text={"Försvara dig"} className={"cta"} />
                </p>
            </div>
        )
    }

    /* Function areAllOpponentsDead
     * We simply check if all opponents in the current battle are dead */
    function areAllOpponentsDead(hpLeft: number){
        // If current opponent is alive we return false
        if(hpLeft){
            return false
        }else if(currentBattle.opponentlist.length > 1){
            let allDead = true
            // Iterate all opponents except the current
            currentBattle.opponentlist.forEach((opponent, index) => {
                if(index !== currentBattle.currentOpponent && opponent.hp > 0)
                    allDead = false                
            })
            return allDead
        }
        return true // If the only opponent is dead
    }

    /* Function setBattleStateToHistory
     * A dispatch to switch to next battle phase */
    function setBattleState(state: EnumBattleStates){
        dispatch(setBattleStatus(state)) // Go to next phase (attack)
    }


    function calculateHpLeft(damage: number){
        let newHp = currentOpponent.hp - damage    
        return (newHp > 0) ? newHp : 0        
    }


    function getDamageText(damage: number, newHp: number){
        const text = <span>Du gör {damage} i skada.</span>

        if(newHp > 0)
            return <span>{text} {currentOpponent.name} har {newHp} kroppspoäng kvar.</span>
        else
            return <span>{text} {currentOpponent.name} är död.</span>
    }   

    function getHitOrMissText(successfulAttack: boolean){
        const hitOrMiss = (successfulAttack) ? "träffar" : "missar"
        return <b>Du {hitOrMiss} {currentOpponent.name}!</b>    
    }


    return (
        <section> 
            {content} 
        </section>                
    )
}

export default Attack