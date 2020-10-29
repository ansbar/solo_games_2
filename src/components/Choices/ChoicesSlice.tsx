import { createSlice  } from '@reduxjs/toolkit';
import { RootState } from '../../app/rootReducer';

export const choicesSlice = createSlice({
    name: 'page',
    initialState: { 
        value: 248 
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const getCurrentPage = (state: RootState) => state.choice.value;
export const { setCurrentPage } = choicesSlice.actions;
export default choicesSlice.reducer;