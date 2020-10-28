import React, { useState, useEffect } from 'react';
import './Battle.scss';
import { useSelector } from 'react-redux'

import ChooseOpponent from './ChooseOpponent/ChooseOpponent';
import InnerForce from './InnerForce/InnerForce'
import Attack from './Attack/Attack'
import Defend from './Defend/Defend'
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
            components = <Attack onSaveToHistory={saveBattleToHistory} stillAliveText={props.stillAliveText}  />
            break;
        case EnumBattleStates.defend:
            components = <Defend onSaveToHistory={saveBattleToHistory} />
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