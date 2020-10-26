import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './rootReducer'

interface IInitialState {    
    general: {[index: string]: string}
    abilities: {[index: string]: string}
    help: {[index: string]: string}
    main: string
    choices: {[index: string]: string}
}

export const languageSlice = createSlice({
    name: 'language',
    initialState: { 
        
     } as IInitialState,
    reducers: {
        setStaticTexts(state, action: PayloadAction<any>) {
            state.general = action.payload.general
            state.abilities = action.payload.abilities
            state.help = action.payload.help            
        },
        setMainText(state, action: PayloadAction<any>) {
            state.main = action.payload
        },
        setChoicesTexts(state, action: PayloadAction<any>) {
            state.choices = action.payload
        },
    },
})

export const getGeneralTexts = (state: RootState) => state.language.general
export const getAbilitiesTexts = (state: RootState) => state.language.abilities
export const getHelpTexts = (state: RootState) => state.language.help
export const getMainText = (state: RootState) => state.language.main
export const { setStaticTexts, setMainText, setChoicesTexts } = languageSlice.actions
export default languageSlice.reducer