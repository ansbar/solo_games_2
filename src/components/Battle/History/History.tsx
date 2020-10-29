import React from 'react';

import styles from './History.module.scss'
import { IBattleHistoryRecord } from 'assets/interfaces';
import { EnumBattleModifiers } from 'assets/enums';

interface IProps {
    history: IBattleHistoryRecord[]
}

function History(props: IProps) {
    if(props.history.length === 0)
        return null

    function resultText(hit: number, blocked: boolean){
        if (blocked && !hit){
            return "Block"
        } else if (hit){
            return "Träff"
        }
        return "Miss"
    }

    function getRow(b: IBattleHistoryRecord){
        return (
            <tr key={b.key}>
                <td>{b.attacker} - {b.defender}</td>
                <td>({b.attackRoll}) {b.attack} {b.hit ? '>' : '<'} {b.defense}</td>
                <td>{resultText(b.damage, b.modifiers.includes(EnumBattleModifiers.block))}</td>
                {b.block ?
                    <td>({b.blockRoll}) {b.block} {b.hit ? '<' : '>'} {b.defense}</td>
                :
                    <td/>
                }
                <td className={b.modifiers.includes(EnumBattleModifiers.innerForce) ? styles.dot : ""}/>
                {b.hit && b.damageRoll ?
                    <td>{b.damage} ({b.damageRoll})</td>
                :
                    <td/>
                }
                <td>{b.hp}</td>
            </tr>
        )
    }    

    return (
        <section className={styles.history}>
            <h4>Stridshistorik</h4>
            <table>
                <thead>
                    <tr>
                        <th>Strid mellan</th>
                        <th>Träff/Försvar</th>
                        <th>Resultat</th>
                        <th>Block</th>
                        <th>IF</th>
                        <th>Skada</th>
                        <th>Liv</th>
                    </tr>
                </thead>
                <tbody>
                    {props.history.map((battle: IBattleHistoryRecord) => {
                        return getRow(battle)
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default History;
