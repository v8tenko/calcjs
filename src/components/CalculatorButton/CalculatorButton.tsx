import React, {FC} from 'react'
import "./CalculatorButton.sass"
import {append, calculate, clear, commitOperation } from "../../features/inputSplice";
import {useAppDispatch} from "../../app/hooks";
import {Operations, Operator} from "../../types/Operations";

export interface CalculatorButtonProps {
    id: string,
    background?: string,
    content: any,
    onClick: () => void
}

const CalculatorButton: FC<CalculatorButtonProps>
    = ({
           id,
           background = '#4d4d4d',
           content,
           onClick,
       }) => {
    return (
        <div
            id={id}
            className="calculator-button"
            onClick={onClick}
            style={{
                background
            }}>
            <p> {content} </p>
        </div>
    )
}

export const NumberCalculatorButton: FC<{ value: number }> = ({value}) => {

    const dispatch = useAppDispatch()
    const appendAction = () => dispatch(append(`${value}`))

    return (
        <CalculatorButton
            id={Operator.parseNumber(value)}
            content={value}
            onClick={appendAction}
        />
    )
}


export const OperationCalculatorButton: FC<{ type: Operations }> = ({type}) => {
    const dispatch = useAppDispatch()
    const appendOperation = () => {
        if (type === Operations.equals) {
            dispatch(calculate())
        } else if (type === Operations.clear) {
            dispatch(clear())
        } else {
            dispatch(commitOperation(type))
        }
    }

    return (
        <CalculatorButton
            id={Operator.parseOperation(type)}
            content={Operator.toString(type, {otherSymbol: true})}
            onClick={appendOperation}
            background={colorOfType(type)}
        />
    )
}

export const DotCalculatorButton: FC = () => {
    const dispatch = useAppDispatch()
    const makeDouble = () => dispatch(append('.'))

    return (
        <CalculatorButton
            id="decimal"
            content={'.'}
            onClick={makeDouble}
        />
    )
}

function colorOfType(type: Operations | null = null): string {
    switch (type) {
        case Operations.clear:
            return '#ac3939'
        case Operations.equals:
            return '#004466'
        default:
            return '#666666'
    }
}


