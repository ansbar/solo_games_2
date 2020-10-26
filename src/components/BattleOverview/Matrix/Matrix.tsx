import React from 'react'
import { useSelector } from 'react-redux'
import { getPlayerHp, getPlayerHpMax } from 'app/playerSlice'
import { getCurrentBattle } from '../CurrentBattleSlice'
import { IBattle, ICurrentBattleOpponents } from 'assets/interfaces'

interface IOpponentsProps {
    battle: IBattle
    generalTexts: { [index: string]: string }
    styles: any
}

function Matrix(props: IOpponentsProps) {  
    const txt = props.generalTexts
    const currentBattle = useSelector(getCurrentBattle)
    const player_hpMax = useSelector(getPlayerHpMax)
    const player_hp = useSelector(getPlayerHp)

    /* Function "createMatrixSection"
     * Creates each section containing an opponent and the player */         
    function createMatrixSection(data: ICurrentBattleOpponents, i: number){
        const currentOpponentHp = currentBattle.opponentlist[i].hp + "/" + currentBattle.opponentlist[i].hpMax // I.e. 12/12
        //const attacks = props.battle.attacks[i]        

        return (            
            <tbody className={i === currentBattle.currentOpponent ? props.styles.selected : ""} key={data.name}>
                {/* NAMES */}
                <tr>
                    <td>
                        <h4>{data.name}</h4>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        {i === 0 &&
                            <h4>{txt.playerName}</h4>
                        }
                    </td>
                    <td></td>
                </tr>
                {/* HP */}
                <tr>
                    <td>
                        <span>{txt.hp}</span>
                    </td>
                    <td>
                        <span>{currentOpponentHp}</span>
                    </td>
                    <td></td>
                    <td>                        
                        {i === 0 &&
                            <span>{txt.hp}</span>
                        }                        
                    </td>
                    <td>                        
                        {i === 0 &&
                            <span>{player_hp + "/" + player_hpMax}</span>
                        }                        
                    </td>
                </tr>
                {/* DEFENSE */}
                <tr>
                    <td>
                        <span>{txt.defense}</span>
                    </td>
                    <td>
                        <span>{data.opponent_defense}</span>
                    </td>
                    <td></td>
                    <td>
                        <span>{txt.defense}</span>
                    </td>
                    <td>
                        <span>{data.player_defense}</span>
                    </td>
                </tr>
                {/* DAMAGE */}
                <tr>
                    <td>
                        <span>{txt.damage}</span>
                    </td>
                    <td>
                        <span>{data.opponent_damage}</span>
                    </td>
                    <td></td>
                    <td>
                    <span>{txt.damage}</span>
                    </td>
                    <td>
                        <span>{data.player_damage || "-"}</span>
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <table>
            {currentBattle.opponentlist.map((data, i: number) => {
                return createMatrixSection(data, i)
            })}     
        </table>      
    )
}

export default Matrix