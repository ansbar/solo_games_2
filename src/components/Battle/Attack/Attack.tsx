import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import diceRoll from '../DiceRoll/DiceRoll'
import Button from 'components/Utils/Button/Button'
import { getCurrentBattle, decreaseCurrentOpponentHP } from 'components/BattleOverview/CurrentBattleSlice'
import { getPlayerInnerForce, decreaseInnerForce } from 'app/playerSlice';
import { EnumAttackType, EnumBattleStates } from 'assets/enums'
import { JsxAttribute, JsxElement } from 'typescript'

interface IChooseOpponentProps {
    attackType: EnumAttackType
}

interface IBattleHistoryRecord {
    attacker: string
    defender: string
    diceroll: number
    defense: number
    damage: number
    successfulAttack: boolean
}

function Attack() {   
    const dispatch = useDispatch()    
    const defaultAttackChance = "2T6"
    const currentBattle = useSelector(getCurrentBattle)
    const currentOpponent = currentBattle.opponentlist[currentBattle.currentOpponent || 0]
    let battleHistory: IBattleHistoryRecord[] = []

    function doAttack(){
        const attackRole = diceRoll(defaultAttackChance)
        const defenseChance = currentOpponent.opponent_defense
        const successfulAttack = attackRole > defenseChance  
        let damage: number = 0      

        if(successfulAttack){
            damage = diceRoll(currentOpponent.player_damage)
            registerDamage(damage)
        }        

        saveAttackToHistory(currentOpponent.name, attackRole, defenseChance, successfulAttack, damage)

        const attackText = getAttackTextFromHistory(1)        
        const hitOrMissText: string = getHitOrMissText(successfulAttack)

        return <div>{hitOrMissText} ({attackText}).</div>
    }

    function registerDamage(damage: number){
        console.log("registerDamage",damage)
        dispatch(decreaseCurrentOpponentHP(damage))
    }

    function saveAttackToHistory(opponentName: string, attackRole: number, opponentDefenseChance: number, successfulAttack: boolean, damage: number){
        battleHistory.push({
            attacker: "Du",
            defender: opponentName,
            diceroll: attackRole,
            defense: opponentDefenseChance,
            successfulAttack: successfulAttack,
            damage: damage
        })
    }

    function getAttackTextFromHistory(index: number){
        const attack = battleHistory[battleHistory.length - index]
        return (attack) ? `${attack.attacker} slår ${defaultAttackChance} och resultatet blir ${attack.diceroll}. ${attack.defender} har ${attack.defense} i försvar` : false
    }


    function getHitOrMissText(successfulAttack: boolean){
        const hitOrMiss = (successfulAttack) ? "träffar" : "missar"
        return `Du ${hitOrMiss} ${currentOpponent.name}`        
    }


    return (
        <section>
            <h4>Attack</h4> 
            <ol>
                <li>Slag, träffar vi?</li>
                <li>Visa skada</li>
                <li>Är motståndaren fortfarande vid liv?</li>
            </ol>
            {doAttack()}
            <button onClick={doAttack}>Attackera</button>
            
        </section>                
    )
}

export default Attack