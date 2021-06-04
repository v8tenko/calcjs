import React, {FC} from "react";
import "./Calculator.sass"
import {
    DotCalculatorButton,
    NumberCalculatorButton,
    OperationCalculatorButton
} from "../CalculatorButton/CalculatorButton";
import {Operator} from "../../types/Operations";
import CalculatorTop from "../CalculatorTop/CalculatorTop";


const Calculator: FC = () => {

    const NumberCells: FC = () => {
        const cells = new Array(10)
            .fill(0)
            .map((_, i) => <NumberCalculatorButton key={i} value={i} />)
        return <> {cells} </>
    }

    const OperationCells: FC = () => {
        const cells = Operator.all()
            .map(o => <OperationCalculatorButton key={o} type={o} />)
        return <> {cells} </>
    }

    return (
        <div id="calculator">
            <CalculatorTop />
            <div id="calculator-buttons">
                <NumberCells />
                <OperationCells />
                <DotCalculatorButton />
            </div>
        </div>
    )
}

export default Calculator
