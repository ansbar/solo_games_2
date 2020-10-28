import React from 'react';
import { useSelector } from 'react-redux'

import { getCurrentBattle } from 'components/BattleOverview/CurrentBattleSlice'
import { getPlayerInnerForce } from 'app/playerSlice';

function ReduxDebug() {   
    const playerInnerForce = useSelector(getPlayerInnerForce) 
    const currentBattle = useSelector(getCurrentBattle)
    let currentOpponent 
    if(currentBattle.currentOpponent !== null)
        currentOpponent = currentBattle.opponentlist[currentBattle.currentOpponent]

    return (
        <section style={{display: "flex"}}>
            <article>
                <h4>Battle</h4>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <td>Id</td>
                            <td>{currentBattle.id}</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{currentBattle.state}</td>
                        </tr>
                        <tr>
                            <td>Attacktype</td>
                            <td>{currentBattle.attackType}</td>
                        </tr>
                    </tbody>
                </table>
            </article>
            {currentOpponent &&
                <article>
                    <h4>Current opponent</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={2}></td>
                            </tr>
                            <tr>
                                <td>Name/id</td>
                                <td>{currentOpponent.name} ({currentBattle.currentOpponent})</td>
                            </tr>
                            <tr>
                                <td>Hp</td>
                                <td>{currentOpponent.hp}/{currentOpponent.hpMax}</td>
                            </tr>
                            <tr>
                                <td>Opponent damage</td>
                                <td>{currentOpponent.opponent_damage}</td>
                            </tr>
                            <tr>
                                <td>Opponent defense</td>
                                <td>{currentOpponent.opponent_defense}</td>
                            </tr>
                            <tr>
                                <td>Player damage</td>
                                <td>{currentOpponent.player_damage}</td>
                            </tr>
                            <tr>
                                <td>Player defense</td>
                                <td>{currentOpponent.player_defense}</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            }
            <article>
                <h4>Player</h4>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <td>Innerforce</td>
                            <td>{playerInnerForce}</td>
                        </tr>
                    </tbody>
                </table>
            </article>
            <article>
                <h4>Battle modifiers</h4>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <td>Innerforce</td>
                            <td>{currentBattle.battleModifiers.innerForce ? "True" : "False"}</td>
                        </tr>
                        <tr>
                            <td>Block</td>
                            <td>{currentBattle.battleModifiers.block ? "True" : "False"}</td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </section>                
    )
}

export default ReduxDebug