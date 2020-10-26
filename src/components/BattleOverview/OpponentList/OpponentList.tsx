import React from 'react'
import { IBattle, ICurrentBattleOpponents } from 'assets/interfaces'

interface IOpponentsProps {
    battle: IBattle
    list: ICurrentBattleOpponents[]
    generalTexts: any
}

function Opponent(props: IOpponentsProps) {  
    const txt = props.generalTexts

    /* Function "createOpponentRow"
     * Creates each opponent row */         
    function createOpponentRow(data: ICurrentBattleOpponents, i: number){
        const attacks = props.battle.attacks[i]

        return (
            <div key={i}>
                <h4>{data.name}</h4>
                <ul>
                    <li>
                        <span>{txt.hp}</span>
                        <span>{data.hp}/{data.hpMax}</span> 
                    </li>
                    <li>
                        <span>{txt.defense}</span>
                        <span>{attacks.opponent_defense}</span> 
                    </li>
                    <li>
                        <span>{txt.damage}</span>
                        <span>{attacks.opponent_damage}</span> 
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            {props.list.map((data, i: number) => {
                return createOpponentRow(data, i)
            })}     
        </div>      
    )
}

export default Opponent;