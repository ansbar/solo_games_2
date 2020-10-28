import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import diceRoll from '../DiceRoll/DiceRoll'
import Button from 'components/Utils/Button/Button'

import { IBattleHistoryRecord } from 'assets/interfaces'
import { EnumBattleStates, EnumAttackResult, EnumBattleModifiers } from 'assets/enums'
import { getCurrentBattle, decreaseOpponentHP, setBattleStatus, toggleBattleModifier } from 'components/BattleOverview/CurrentBattleSlice'

interface IProps {
    onSaveToHistory: any
    stillAliveText: string
}

function Attack(props: IProps) {   
    const dispatch = useDispatch()
    const loadOnce = useRef(false)      
    const [content, setContent] = useState(<p></p>)
    
    const currentBattle = useSelector(getCurrentBattle)
    const o = currentBattle.opponentlist[currentBattle.currentOpponent || 0]
    const battleHistoryRecord: IBattleHistoryRecord = {
        key: Date.now(),
        attacker: "Hämnaren",
        defender: o.name,
        modifier: null,
        attack: 0,
        defense: 0,
        result: EnumAttackResult.none,
        damage: 0,
        damageRoll: o.player_damage,
        hp: ""
    }
    

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
        const attack = calculateAttack()
        const defense = o.opponent_defense
        let result = attack > defense
        const damage = calculateDamage()
        let damageText
        let hpLeft = calculateHpLeft(damage)

        // If the opponent where hit, assign damage and history
        if(result){     
            dispatch(decreaseOpponentHP(damage)) 
            damageText = getDamageText(damage, hpLeft)  

            battleHistoryRecord.damage = damage
            battleHistoryRecord.hp = hpLeft + "/" + o.hpMax                      
        }        

        setContent(
            <div>
                {getHitOrMissText(result)}
                <br/>{damageText}
                {endAttack(hpLeft)}
            </div>
        )
    }

    /* Function calculateAttack()
     * Uses the standard 2T6 for attack. */
    function calculateAttack(){
        let attack = diceRoll("2T6")

        // Subtract 2 from the result if players tried to block
        if(currentBattle.battleModifiers.block){
            attack -= 2
            toggleBattleModifier(EnumBattleModifiers.block)
        }
        return attack
    }


    /* Function calculateDamage()
     * Double damage made if inner force was used */
    function calculateDamage(){
        let damage = diceRoll(o.player_damage) 

        // Doubles the damage result if player used inner force
        if(currentBattle.battleModifiers.innerForce){
            damage = damage * 2
            toggleBattleModifier(EnumBattleModifiers.innerForce)
            
            battleHistoryRecord.damageRoll = o.player_damage + "x2"
            battleHistoryRecord.modifier = EnumBattleModifiers.innerForce
        }
        return damage
    }


    /* Function endAttack
     * What happends after the attack?
     * -If there are opponents left alive we go to defend phase
     * -If all are dead we continue the story */
    function endAttack(hpLeft: number){
        // Save battle to history. The function is in parent component.
        props.onSaveToHistory(battleHistoryRecord)

        if(areAllOpponentsDead(hpLeft))
            return <Button onClick={() => dispatch(setBattleStatus(EnumBattleStates.win))} text={"Gå vidare"} className={"cta"} />
        
        return (
            <div>
                <br/>
                {props.stillAliveText}<br/>
                <p>
                    <Button onClick={() => dispatch(setBattleStatus(EnumBattleStates.defend))} text={"Försvara dig"} className={"cta"} />
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


    function calculateHpLeft(damage: number){
        let newHp = o.hp - damage    
        return (newHp > 0) ? newHp : 0        
    }


    function getDamageText(damage: number, newHp: number){
        const text = <span>Du gör {damage} i skada.</span>

        if(newHp > 0)
            return <span>{text} {o.name} har {newHp} kroppspoäng kvar.</span>
        else
            return <span>{text} {o.name} är död.</span>
    }   


    function getHitOrMissText(hit: boolean){
        const hitOrMiss = (hit) ? "träffar" : "missar"
        return <b>Du {hitOrMiss} {o.name}!</b>    
    }


    return (
        <section> 
            {content} 
        </section>                
    )
}

export default Attack