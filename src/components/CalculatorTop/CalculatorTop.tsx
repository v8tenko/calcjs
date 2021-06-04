import React, {FC} from "react";
import "./CalculatorTop.sass"
import {useAppSelector} from "../../app/hooks";

const CalculatorTop: FC = () => {

    const {log, input} = useAppSelector(state => state.input)

    return (
        <div id="calculator-top">
            <p> {log || 0} </p>
            <p id="display"> {input || 0} </p>
        </div>
    )
}

export default CalculatorTop
