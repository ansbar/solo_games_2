import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrentBattle, ICurrentBattleModifiers } from 'assets/interfaces'
import { RootState } from 'app/rootReducer'
import { EnumOpponents, EnumAttackType, EnumBattleStates} from 'assets/enums'

export const currentBattleSlice = createSlice({
    name: 'currentBattle',
    initialState: {
        id: EnumOpponents.none, // Used to identify the battle (EnumOpponents)
        state: EnumBattleStates.none,
        attackType: EnumAttackType.none,
        blockable: true,        
        currentOpponent: null,
        battleModifiers: {
            innerForce: false
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
        setBattleModifiers(state, action: PayloadAction<ICurrentBattleModifiers>) {
            state.battleModifiers = action.payload
        },
        setCurrentOpponent(state, action: PayloadAction<number>) {
            state.currentOpponent = action.payload
        },
        decreaseCurrentOpponentHP(state, action: PayloadAction<number>) {
            if(state.currentOpponent)
                state.opponentlist[state.currentOpponent].hp -= action.payload
        }
    },
})

export const getCurrentBattle = (state: RootState) => state.currentBattle
export const { 
    setCurrentBattle, 
    setBattleStatus, 
    setCurrentOpponent, 
    setBattleModifiers, 
    decreaseCurrentOpponentHP 
} = currentBattleSlice.actions
export default currentBattleSlice.reducer