import React from 'react';

import styles from './History.module.scss'
import { IBattleHistoryRecord } from 'assets/interfaces';
import { EnumAttackResult } from 'assets/enums';

interface IProps {
    history: IBattleHistoryRecord[]
}

function History(props: IProps) {
    if(props.history.length === 0)
        return null

    function resultText(attackResult: EnumAttackResult){
        let text
        switch(attackResult){
            case EnumAttackResult.hit:
                text = "Träff"
                break;
            case EnumAttackResult.miss:
                text = "Miss"
                break;
            case EnumAttackResult.block:
                text = "Block"
                break;
        }
        return text
    }

    function getRow(battle: IBattleHistoryRecord){
        return (
            <tr key={battle.key}>
                <td>{battle.attacker} - {battle.defender}</td>
                <td>2T6 = {battle.attack}</td>
                <td>{battle.defense}</td>
                <td>{resultText(battle.result)}</td>
                {battle.result === EnumAttackResult.hit ?
                    <td>{battle.damageRoll} = {battle.damage}</td>
                :
                    <td></td>
                }
                <td>{battle.hp}</td>
            </tr>
        )
    }    

    return (
        <section className={styles.history}>
            <h4>Stridshistorik</h4>
            <table>
                <thead>
                    <tr>
                        <th></th>
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
