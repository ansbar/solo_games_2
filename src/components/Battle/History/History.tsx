import React from 'react';

import styles from './History.module.scss'
import { IBattleHistoryRecord } from 'assets/interfaces';

interface IProps {
    history: IBattleHistoryRecord[]
}

function History(props: IProps) {
    if(props.history.length === 0)
        return null

    function getRow(battle: IBattleHistoryRecord){
        return (
            <tr key={battle.timeStamp}>
                <td>{battle.attacker}</td>
                <td>{battle.defender}</td>
                <td>2T6 = {battle.attackRoll}</td>
                <td>{battle.defense}</td>
                <td>{battle.successful ? "Träff" : "Miss"}</td>
                {battle.successful ?
                    <td>{battle.damage} = {battle.damageRoll}</td>
                :
                    <td></td>
                }
                <td>{battle.hp}</td>
            </tr>
        )
    }    

    return (
        <section className={styles.history}>
            <h4>Historik</h4>
            <table>
                <thead>
                    <tr>
                        <th>Angripare</th>
                        <th>Försvarare</th>
                        <th>Träffslag</th>
                        <th>Försvar</th>
                        <th>Resultat</th>
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
