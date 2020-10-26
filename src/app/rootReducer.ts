import { combineReducers } from '@reduxjs/toolkit'
import languageSliceReducer from './LanguageSlice'
import playerSliceReducer from './playerSlice'
import choiceSliceReducer from 'components/Choices/ChoicesSlice'
import currentBattleSliceReducer from 'components/BattleOverview/CurrentBattleSlice'

const rootReducer = combineReducers({
    language: languageSliceReducer,
    player: playerSliceReducer,
    choice: choiceSliceReducer,
    currentBattle: currentBattleSliceReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer