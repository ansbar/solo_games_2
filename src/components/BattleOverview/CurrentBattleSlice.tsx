import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrentBattle } from 'assets/interfaces'
import { RootState } from 'app/rootReducer'
import { EnumOpponents, EnumAttackType, EnumBattleStates, EnumBattleModifiers} from 'assets/enums'

export const currentBattleSlice = createSlice({
    name: 'currentBattle',
    initialState: {
        id: EnumOpponents.none, // Used to identify the battle (EnumOpponents)
        state: EnumBattleStates.none,
        attackType: EnumAttackType.none,
        blockable: true,        
        currentOpponent: null,
        battleModifiers: {
            innerForce: false,
            block: false
        },
        opponentlist: [{ 
            name: "",
            hpMax: 0,
            hp: 0
        }]
    } as ICurrentBattle,
    reducers: {
        setCurrentBattle(state, action: PayloadAction<ICurrentBattle>) {
            state.id = action.payload.id
            state.state = action.payload.state
            state.attackType = action.payload.attackType
            state.blockable = action.payload.blockable
            state.battleModifiers = action.payload.battleModifiers
            state.opponentlist = action.payload.opponentlist
        },
        setBattleStatus(state, action: PayloadAction<EnumBattleStates>) {
            state.state = action.payload
        },
        toggleBattleModifier(state, action: PayloadAction<EnumBattleModifiers>) {
            console.log(action.payload, state.battleModifiers[action.payload])
            state.battleModifiers[action.payload] = !state.battleModifiers[action.payload]
            console.log(action.payload, state.battleModifiers[action.payload])
        },
        setCurrentOpponent(state, action: PayloadAction<number>) {
            state.currentOpponent = action.payload
        },
        decreaseOpponentHP(state, action: PayloadAction<number>) {            
            if(state.currentOpponent !== null){
                const damage = action.payload 
                const opponent = state.opponentlist[state.currentOpponent]
                const newHp = opponent.hp - damage
                opponent.hp = (newHp > 0) ? newHp : 0 
            }
        }
    },
})

export const getCurrentBattle = (state: RootState) => state.currentBattle
export const { 
    setCurrentBattle, 
    setBattleStatus, 
    setCurrentOpponent, 
    toggleBattleModifier, 
    decreaseOpponentHP 
} = currentBattleSlice.actions
export default currentBattleSlice.reducer