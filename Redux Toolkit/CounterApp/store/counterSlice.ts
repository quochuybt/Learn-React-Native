import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value:number
}

const initialState: CounterState = {
    value : 0
}

export const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers: {
        increment: (state) => {state.value +=1},
        descrement: (state) => {state.value -=1},
    }
})

export default counterSlice.reducer;
export const {increment, descrement} = counterSlice.actions;