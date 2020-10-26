import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './BattleOverview.module.scss'
import battles from 'assets/opponents'
import Matrix from './Matrix/Matrix'
import { setCurrentBattle, getCurrentBattle } from './CurrentBattleSlice'

import { IBattle, ICurrentBattle, ICurrentBattleOpponents, IOpponent } from 'assets/interfaces'
import { EnumBattleStates, EnumOpponents } from 'assets/enums'

interface IOpponentsProps {
    battle: IBattle
    generalTexts: { [index: string]: string }
    opponentsTexts: { [index: string]: EnumOpponents }
}

function BattleOverview(props: IOpponentsProps) {  
    const dispatch = useDispatch();
    const currentBattle = useSelector(getCurrentBattle)

    useEffect(() => {
        // Only initializes opponent if not already set.
        if(currentBattle.id !== props.battle.id) initializeCurrentBattle()
    })    


    /* Function "initializeCurrentBattle"
     * (Only initializes battle when changing battle opponent. Updates is handled in the battle component)
     * Sets the current battle/opponents to the store. */         
    function initializeCurrentBattle(){
        const opponent: IOpponent = battles[props.battle.id]
        
        // Iterate opponent list, some battles have multiple opponents, like "soldiers"
        let opponentData: ICurrentBattleOpponents[] = []        
        opponent.list?.map((data, i: number) => {
            opponentData.push({
                name: data.name,
                hpMax: data.hp,
                hp: data.hp,
                player_defense: props.battle.attacks[i].player_defense || 0,
                player_damage: props.battle.attacks[i].player_damage || "",
                opponent_damage: props.battle.attacks[i].opponent_damage || "",   
                opponent_defense: props.battle.attacks[i].opponent_defense || 0           
            })            
        })

        const opponentObject: ICurrentBattle = {
            id: props.battle.id,
            state: EnumBattleStates.chooseOpponent,
            currentOpponent: 0,
            attackType: props.battle.attackType,
            blockable: props.battle.blockable,
            battleModifiers: {
                innerForce: false
            },
            opponentlist: opponentData
        }
        
        dispatch(setCurrentBattle(opponentObject))
    }    

    
    const opponentName = props.opponentsTexts[props.battle.id] || props.battle.id

    return (
        <section className={styles.overview}>
            <h2>{opponentName}</h2>
            <Matrix
                battle={props.battle} 
                generalTexts={props.generalTexts} 
                styles={styles}
            />
        </section>    
    )
}

export default BattleOverview;
