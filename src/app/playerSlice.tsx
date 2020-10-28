import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './rootReducer'
import { EnumAbilities } from 'assets/enums'

interface IInitialState {
    hp_max: number
    hp: number
    defense: number
    damage: string
    innerForce: number
    abilities: {
        [index: string]: Boolean        
    }
}

export const playerSlice = createSlice({
    name: 'player',
    initialState: { 
        hp_max: 20,
        hp: 20,
        defense: 0,
        innerForce: 0,
        damage: "",
        abilities: {
            acrobat: true
        }
     } as IInitialState,
    reducers: {
        decreaseHp(state, action: PayloadAction<number>) {
            const new_hp = state.hp - action.payload
            state.hp = (new_hp <= 0) ? state.hp : new_hp
        },
        increaseHp(state, action: PayloadAction<number>) {
            const new_hp = state.hp + action.payload
            state.hp = (new_hp >= state.hp_max) ? state.hp_max : new_hp 
        },
        setDefense(state, action: PayloadAction<number>) {
            state.defense = action.payload
        },
        setDamage(state, action: PayloadAction<string>) {
            state.damage = action.payload
        },
        decreaseInnerForce(state) {
            state.innerForce -= 1
        },
        addAbility(state, action: PayloadAction<EnumAbilities>) {
            if(!(action.payload in state.abilities))
                state.abilities[action.payload] = true
        },
    },
})

export const getPlayerHpMax = (state: RootState) => state.player.hp_max
export const getPlayerHp = (state: RootState) => state.player.hp
export const getPlayerDefense = (state: RootState) => state.player.defense
export const getPlayerDamage = (state: RootState) => state.player.damage
export const getPlayerInnerForce = (state: RootState) => state.player.innerForce
export const getPlayerAbilities = (state: RootState) => state.player.abilities

export const { decreaseHp, increaseHp, setDefense, setDamage, addAbility, decreaseInnerForce } = playerSlice.actions
export default playerSlice.reducer