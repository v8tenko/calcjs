import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Operations, Operator, isInLowPriority} from "../types/Operations";

export interface InputState {
    log: string,
    input: string,
    isNew: boolean
}

export const initialState: InputState = {
    log: '0',
    input: '0',
    isNew: true
}

const isOperation = (x: string) => /([+\-⋅/])/.test(x)

const inputSplit = createSlice({
    name: 'input',
    initialState,
    reducers: {
        append(state, action: PayloadAction<string>) {
            if (state.input.length === 1 && !/[0-9]/.test(state.input)) {
                state.input = ''
            }
            if (state.input.slice(-1) === '0' && action.payload === '0') {
                state.isNew = false
                return
            }
            if (state.log.includes('=')) {
                state.log = '0'
                state.input = '0'
                state.isNew = true
            }
            if (state.isNew) {
                state.isNew = false
                if (/[0-9]/.test(action.payload)) {
                    state.input = state.log = action.payload
                    return
                }
            }
            if (action.payload === '.') {
                if (state.input.includes('.')) {
                    return
                }
            }
            state.log += action.payload
            state.input += action.payload
        },
        commitOperation(state, action: PayloadAction<Operations>) {
            const logSign = Operator.toString(action.payload)
            const inputSign = Operator.toString(action.payload, {otherSymbol: true})
            if (state.log.includes('=')) {
                state.log = state.log.slice(state.log.lastIndexOf('=') + 1)
            }
            if (state.isNew) {
                state.input = inputSign
                state.log = logSign
                return
            }
            const last = state.log.slice(-2)
            let count = 0
            if (last.split('').filter(isOperation).length === 2) {
                count = 2
            } else if (isOperation(last.slice(-1))) {
                count = 1
            }
            if (action.payload !== Operations.subtract) {
                if (count) {
                    state.log = state.log.slice(0, -count) + logSign
                } else {
                    state.log += logSign
                }
                state.input = inputSign
            } else {
                if (/([+\-⋅/])-/.test(last)) {
                    state.log = state.log.slice(0, -2) + logSign
                } else {
                    state.log += logSign
                }
                state.input = inputSign
            }

        },
        calculate(state) {
            if (['/', '⋅'].includes(state.log[0])) {
                return
            }
            while (isOperation(state.log.slice(-1)[0])) {
                state.log = state.log.slice(0, -1)
            }
            let actions: (number | string)[] = []
            let added = false
            if (state.log[0] !== '+') {
                state.log = '+' + state.log
                actions.push(0)
                added = true
            }
            let idx = 0
            let current = ''
            let len = state.log.length
            while (idx < len) {
                actions.push(state.log[idx])
                current = ''
                idx++
                if (state.log[idx] === '-') {
                    current += '-'
                    idx++
                }
                while (idx < len && !isOperation(state.log[idx])) {
                    current += state.log[idx]
                    idx++
                }
                current && actions.push(+current)
            }
            const calc = (act: (number | string)[]): number => {
                if (act.length === 3) {
                    return Operator.call(
                        Operator.parse(act[1] as string),
                        act[0] as number, act[2] as number
                    )
                }
                let start = isInLowPriority(act[1] as string) ? +act[2] : +act[0]
                let nextIdx
                for (let i = 3; i < act.length; i += 2) {
                    if (isInLowPriority(act[i] as string)) {
                        nextIdx = i
                        break
                    }
                    start = Operator.call(Operator.parse(act[i] as string), start, +act[i + 1])
                }
                if (isInLowPriority(act[1] as string)) {
                    start = Operator.call(Operator.parse(act[1] as string), +act[0], start)
                }
                if (nextIdx === undefined) {
                    return start
                }
                return calc([start, ...act.slice(nextIdx)])
            }
            const res = (+calc(actions).toFixed(5)).toString()
            if (added) {
                state.log = state.log.slice(1)
            }
            state.log += '=' + res
            state.input = res
        }
        ,
        clear(state) {
            state.log = '0'
            state.input = '0'
            state.isNew = true
        }
    }
})

export const {append, clear, commitOperation, calculate} = inputSplit.actions
export default inputSplit.reducer
