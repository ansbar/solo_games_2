import React from 'react';
import './Battle.scss';
import { useSelector } from 'react-redux'


import ChooseOpponent from './ChooseOpponent/ChooseOpponent';
import InnerForce from './InnerForce/InnerForce'
import Attack from './Attack/Attack'
import { EnumBattleStates } from 'assets/enums';
import { getCurrentBattle } from 'components/BattleOverview/CurrentBattleSlice'

interface IBattleProps {

}

function Battle(props: IBattleProps) {   
    const currentBattle = useSelector(getCurrentBattle)
    let components

    switch (currentBattle.state) {
        case EnumBattleStates.chooseOpponent:
            components = <ChooseOpponent opponents={currentBattle.opponentlist} />
            break;
        case EnumBattleStates.innerForce:
            components = <InnerForce attackType={currentBattle.attackType} />
            break;
        case EnumBattleStates.attack:
            components = <Attack />
            break;
      }

    return (
        <section>
             {components}
        </section>                
    )
}

export default Battle