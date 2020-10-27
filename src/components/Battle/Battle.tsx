import React, { useState, useEffect } from 'react';
import './Battle.scss';
import { useSelector } from 'react-redux'

import ChooseOpponent from './ChooseOpponent/ChooseOpponent';
import InnerForce from './InnerForce/InnerForce'
import Attack from './Attack/Attack'
import History from './History/History'
import { EnumBattleStates } from 'assets/enums';
import { IBattleHistoryRecord } from 'assets/interfaces'
import { getCurrentBattle } from 'components/BattleOverview/CurrentBattleSlice'

interface IProps {
    stillAliveText: string
}

function Battle(props: IProps) {   
    const currentBattle = useSelector(getCurrentBattle)
    const [battleHistory, setBattleHistory] = useState([] as IBattleHistoryRecord[])     
    let components

    useEffect(() => {        
        saveBattleToHistory({
            timeStamp: 2,
            attacker: "Hämnaren",
            defender: "Ung kapten",
            attackRoll: 7,
            defense: 4,
            successful: true,
            damageRoll: 5,
            damage: "1T6",
            hp: "7/12"
        })
        saveBattleToHistory({
            timeStamp: 1,
            attacker: "Ung kapten",
            defender: "Hämnaren",
            attackRoll: 9,
            defense: 7,
            successful: true,
            damageRoll: 6,
            damage: "1T6+2",
            hp: "14/20"
        })
    }, [])

    function saveBattleToHistory(battleObj: IBattleHistoryRecord){
        setBattleHistory(battleHistory => [battleObj, ...battleHistory]);
    }

    switch (currentBattle.state) {
        case EnumBattleStates.chooseOpponent:
            components = <ChooseOpponent opponents={currentBattle.opponentlist} />
            break;
        case EnumBattleStates.innerForce:
            components = <InnerForce attackType={currentBattle.attackType} />
            break;
        case EnumBattleStates.attack:
            components = <Attack stillAliveText={props.stillAliveText} onSaveToHistory={saveBattleToHistory} />
            break;
    }

    return (
        <section>
            {components}
            <History history={battleHistory} />
        </section>                
    )
}

export default Battle