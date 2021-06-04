import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Operations, Operator} from "../types/Operations";

export interface InputState {
    current: string | null,
    prev: number,
    lastOperation: Operations | null,
    log: string,
    input: string,
    isLastActionMinus: boolean
}

export const initialState: InputState = {
    prev: 0,
    current: '',
    lastOperation: null,
    isLastActionMinus: false,
    log: '',
    input: ''
}


const inputSplit = createSlice({
    name: 'input',
    initialState,
    reducers: {
        append(state, action: PayloadAction<string>) {
            if (state.lastOperation === Operations.equals) {
                state.current = null
                state.prev = 0
                state.lastOperation = null
                state.log = ''
                state.input = ''
            }
            state.log += action.payload
            if (!state.isLastActionMinus && !/[0-9]/.test(state.input)) {
                state.input = action.payload
                state.current = action.payload
                return
            }
            state.current += action.payload
            state.input += action.payload
            state.isLastActionMinus = false
        },
        commitMathOperation(state, action: PayloadAction<Operations>) {
            const isNegative = state.isLastActionMinus && action.payload === Operations.subtract
            const sign = Operator.toString(action.payload)
            if (state.lastOperation === Operations.equals) {
                state.log = `${state.prev}`
            }
            state.input = sign
            state.log += sign
            state.prev = Operator.call(state.lastOperation, state.prev, +state.current!)
            state.current = null
            if (isNegative) {
                state.current = '-'
            }
            state.lastOperation = action.payload
            state.isLastActionMinus = action.payload === Operations.subtract
        },
        calculate(state) {
            if (state.lastOperation === Operations.equals) {
                return
            }
            let calculated = state.prev = Operator.call(state.lastOperation, state.prev, +state.current!)
            if (!state.current) {
                calculated = NaN
            }
            state.prev = calculated
            state.current = null
            state.log += `=${calculated}`
            state.input = `${calculated}`
            state.lastOperation = Operations.equals
            state.isLastActionMinus = false
        },
        clear(state) {
            state.current = null
            state.prev = 0
            state.lastOperation = null
            state.log = ''
            state.input = ''
            state.isLastActionMinus = false
        }
    }
})

export const {append, commitMathOperation, calculate, clear} = inputSplit.actions
export default inputSplit.reducer
