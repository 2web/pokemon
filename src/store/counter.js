import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        plusAction: (state, action) => ({
            ...state,
            value: state.value + action.payload
        }),
        minusAction: (state, action) => ({
            ...state,
            value: state.value - action.payload
        })   
    }
});

export const { plusAction, minusAction } = slice.actions;

export const selectCount = state => state.counter.value;

export default slice.reducer;