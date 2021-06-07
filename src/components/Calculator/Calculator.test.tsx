import React from "react";
import Calculator from "./Calculator";
import {render, screen, fireEvent } from "../../test-utils";


const clickButton =
    (number: number | string) => fireEvent.click(screen.getAllByText(number).pop()!.parentElement!)
const click = (...number: (number | string)[]) => {
    number.forEach(clickButton)
}
const clear = () => clickButton('AC')
const dot = () => clickButton('.')

describe('базовые тесты калькулятора', () => {

    beforeEach(() => render(<Calculator />))

    test('все кнопки присутствуют', () => {
        expect(screen.getAllByText(/[0-9]/).length).toBe(12)
        expect(screen.getAllByText(/(AC)|\/|x|-|\+|=|\./).length).toBe(7)
    })

    test('правильный ввод', () => {
        click(1, 2)
        expect(screen.getAllByText("12").length).toBe(2)
        clear()
        expect(screen.getAllByText("0").length).toBe(3)
        for (let i = 0; i < 10; i++) {
            fireEvent.click(screen.getAllByText(i).pop()!.parentElement!)
        }
        expect(screen.getAllByText("0123456789").length).toBe(2)
        clear()
        expect(screen.getAllByText("0").length).toBe(3)

    })

    test('точка работает правильно', () => {
        click(1, 2)
        dot()
        click(3, 4)
        expect(screen.getAllByText('12.34').length).toBe(2)
        clear()
        dot()
        click(9, 0, 1)
        expect(screen.getAllByText('0.901').length).toBe(2)
        clear()
    })

    test('операторы без чисел', () => {
        click(1, '+', '-', '/', 'x', '-')
        expect(screen.getAllByText('1⋅-').length).toBe(1)
        expect(screen.getAllByText('-').length).toBe(2)
        clear()
        click(2, '-', '+', '-', 'x', '-', '+')
        expect(screen.getAllByText('2+').length).toBe(1)
        expect(screen.getAllByText('+').length).toBe(2)
        clear()
        click(1, '+', '-', '-', '-', '+', '-')
        expect(screen.getAllByText('1+-').length).toBe(1)
        expect(screen.getAllByText('-').length).toBe(2)
        clear()
    })

    test('правильные расчеты', () => {
        click(1, 2, '+', 3, 9, '-', 5, 6, 7, 'x', 8, '.', 2, '=')
         expect(screen.getAllByText('12+39-567⋅8.2=-4598.4').length).toBe(1)
        expect(screen.getAllByText('-4598.4').length).toBe(1)
        clear()
        expect(screen.getAllByText('0').length).toBe(3)
        click(3, 4, 9, '.', 9, 8, '-', 7, 1, 8, 'x', 3, 4, '/', 8, '=')
        expect(screen.getAllByText('349.98-718⋅34/8=-2701.52').length).toBe(1)
        expect(screen.getAllByText('-2701.52').length).toBe(1)
        clear()
        click(1, 2, 3, 4, '.', 5, 6, 7, '=')
        expect(screen.getAllByText('1234.567=1234.567').length).toBe(1)
        expect(screen.getAllByText('1234.567').length).toBe(1)
        clear()
        click(1, '+', '-', '=')
        expect(screen.getAllByText('1=1').length).toBe(1)
        expect(screen.getAllByText('1').length).toBe(2)
        clear()
    })

    test('операторы с числами', () => {
        click(1, 2, '+', 'x', '-', 7, 9, '.', 1, '+', 'x', 1, 6, '=')
        expect(screen.getAllByText('12⋅-79.1⋅16=-15187.2').length).toBe(1)
        expect(screen.getAllByText('-15187.2').length).toBe(1)
        clear()
        click(3, 4, '.', 6, 7, 'x', '-', 9, '+', '-', 'x', '/', '+', '-', 9, 1, 2, 5, '.', 1, 3, '=')
        expect(screen.getAllByText('34.67⋅-9+-9125.13=-9437.16').length).toBe(1)
        expect(screen.getAllByText('-9437.16').length).toBe(1)
        clear()
        // pain
    })

    test('использование предыдущего значения в следующих расчетах', () => {
        click(1, 2, '+', 3, '.', 4, '=', '/', '-', 8, '.', 9, '=', 'x', 9, '.', 5, '=')
        expect(screen.getAllByText('-1.73034⋅9.5=-16.43823').length).toBe(1)
        expect(screen.getAllByText('-16.43823').length).toBe(1)
        clear()
        click(3, 4, '.', 5, '=', 'x', '-', '/', 8, '.', 0, 1, 'x', 9, '=', '-', 5, 1, '=', '+', 1, '.', 9, '=')
        expect(screen.getAllByText('-12.23596+1.9=-10.33596').length).toBe(1)
        expect(screen.getAllByText('-10.33596').length).toBe(1)
        clear()
    })

})


