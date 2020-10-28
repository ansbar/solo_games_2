import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import diceRoll from '../DiceRoll/DiceRoll'
import Block from './Block/Block'
import Button from 'components/Utils/Button/Button'
import { EnumBattleStates, EnumAttackResult } from 'assets/enums'
import { IBattleHistoryRecord } from 'assets/interfaces'
import { getCurrentBattle, setCurrentOpponent, setBattleStatus } from 'components/BattleOverview/CurrentBattleSlice'
import { getPlayerHp, getPlayerHpMax, decreaseHp} from 'app/playerSlice'

interface IProps {
    onSaveToHistory: any
}

function Defend(props: IProps) {   
    const loadOnce = useRef(false)
    const dispatch = useDispatch()  
    const [content, setContent] = useState(<p></p>)  
    const playerHp = useSelector(getPlayerHp)
    const playerHpMax = useSelector(getPlayerHpMax)
    const currentBattle = useSelector(getCurrentBattle)
    let playerPrivateHp = playerHp

    let attackRoll = "2T6"    
    let hasAlreadyBlocked = false
    

    /* Function findNextOpponent
     * @startIndex: from which index to start searching (like in indexOf)
     * Finds the next opponent that is alive 
     * Returns the index from opponentlist */     
    function findNextOpponent(startIndex: number){
        return currentBattle.opponentlist.findIndex((opponent, i) => i >= startIndex && opponent.hp > 0);
    }


    useEffect(() => {
        /* We don't want this component to run more than once per battle cycle */
        if (!loadOnce.current) {
            doDefend(findNextOpponent(0))
            loadOnce.current = true;
        }
    })
    

    /* Function doDefend
     * @opponentIndex: If multiple opponents.
     * Main track. We run this function for every opponent alive */
    function doDefend(oIndex: number){    
        // Keep track of current opponent in battle overview for instance
        dispatch(setCurrentOpponent(oIndex))
        const o = currentBattle.opponentlist[oIndex]          
         
        // Do attack role and calculate hit & damage
        const attack = diceRoll(attackRoll)
        const defense = o.player_defense
        let result = attack > o.player_defense ? EnumAttackResult.hit : EnumAttackResult.miss
        const damage = diceRoll(o.opponent_damage)        

        // If opponent misses we end here
        if (result === EnumAttackResult.miss){
            endDefense(<b>{o.name} missar!</b>)
            return
        } 
        
        // If it's a hit we continue with either
        // -show block option if applicable
        // -or straight to damage
        if (!hasAlreadyBlocked && currentBattle.blockable){
            /* We should show the block option if:
            * 1. It's a punch (thats blockable)
            * 2. It's a hit
            * 3. We haven't tried blocking earlier in the same defense phase */
            handleBlock()            
        } else {
            doDamage()
        }


        /* Function handleBlock
         * Shows the Block component and handles  */
        function handleBlock(){
            setContent(<Block opponentName={o.name} defense={defense} onBlock={handleBlockResult} />)
    
            /* Function handleBlockResult
             * @{
             *   useBlock: If user tried to block 
             *   succesfulBlock: If  the block was succesful
             * }
             * Callback from Block component */
            function handleBlockResult(blockResult: {useBlock: boolean, succesfulBlock: boolean}){
                if (blockResult.succesfulBlock){
                    result = EnumAttackResult.block
                    endDefense(<b>Du lyckas blockera slaget!</b>)                
                } else if (blockResult.useBlock) {
                    hasAlreadyBlocked = true
                    doDamage(<b>Du misslyckas med att blockera slaget.<br/></b>)
                } else {
                    doDamage(<b>{o.name} träffar!<br/></b>)
                }
            }        
        }


        /* Function doDamage
         * @initalText: Prepend the damage text with this.
         * If it's a hit and the player failed/couldn't block, we calculate damage */
        function doDamage(initalText?: JSX.Element){
            playerPrivateHp = calculateHpLeft()            
            const text = <span>{o.name} gör {damage} i skada.</span>
            dispatch(decreaseHp(damage))    

            endDefense(<span>{initalText}{text} Du har {playerPrivateHp} kroppspoäng kvar.</span>) 

            function calculateHpLeft(){
                let newHp = playerPrivateHp - damage    
                return (newHp > 0) ? newHp : 0        
            }
        }

        /* Function endDefense
        * If opponent misses we either start the next attack if there are any opponents left
        * Or we go to next battle round, starting with Choose opponent */
        function endDefense(text: JSX.Element){
            const firstOpponentIndex = findNextOpponent(oIndex + 1)   

            // Save battle to history. The function is in parent component
            props.onSaveToHistory({
                key: Date.now(),
                attacker: o.name,
                defender: "Hämnaren",
                attack: attack,
                defense: defense,
                result: result,
                damage: damage,
                damageRoll: o.opponent_damage,
                hp: playerPrivateHp + "/" + playerHpMax
            } as IBattleHistoryRecord)

            setContent(            
                <div>
                    {text}<br/>
                    {playerPrivateHp > 0 ?
                        <p>
                            {firstOpponentIndex >= 0 ?
                                <Button 
                                    onClick={() => doDefend(firstOpponentIndex)} 
                                    className="cta" 
                                    text="Nästa attackerare" />
                            :
                                <Button 
                                    onClick={() => setBattleState(EnumBattleStates.chooseOpponent)} 
                                    className="cta" 
                                    text="Gå vidare" />
                            }
                        </p>                           
                    :
                        <p><b>Du är död.</b></p>
                    }
                </div>
            )        
        }
    }


    /* Function setBattleStateToHistory
     * A dispatch to switch to next battle phase */
    function setBattleState(state: EnumBattleStates){
        dispatch(setBattleStatus(state)) // Go to next phase (attack)
    }

    return (
        <section> 
            {content} 
        </section>                
    )
}

export default Defend