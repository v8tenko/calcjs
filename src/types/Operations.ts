export enum Operations {
    add, subtract, multiply, divide, equals, clear
}

export const highPriority = ['/', '⋅']
export const lowPriority = ['+', '-']

export const isInLowPriority = (x: string) => lowPriority.includes(x)
export const isInHighPriority = (x: string) => highPriority.includes(x)

export class Operator {



    static toString(value: Operations, settings: {otherSymbol: boolean} = {otherSymbol: false}) {
        switch (value) {
            case Operations.divide:
                return '/'
            case Operations.subtract:
                return '-'
            case Operations.add:
                return '+'
            case Operations.multiply:
                return settings?.otherSymbol ? 'x' : '⋅'
            case Operations.equals:
                return '='
            case Operations.clear:
                return 'AC'
        }
    }

    static parse(value: string): Operations {
        switch (value) {
            case '+':
                return Operations.add
            case '-':
                return Operations.subtract
            case '/':
                return Operations.divide
            case '⋅':
                return Operations.multiply
            default:
                return Operations.equals
        }
    }


    static call(type: Operations | null, x: number, y: number | null): number {
        if (y === null) {
            return NaN
        }
        if (type === null) {
            return y
        }
        let r: number
        switch (type) {
            case Operations.divide:
                r = x / y
                break
            case Operations.subtract:
                r = x - y
                break
            case Operations.add:
                r = x + y
                break
            case Operations.multiply:
                r = x * y
                break
            case Operations.equals:
                r = x
                break
            case Operations.clear:
                r = 0
                break
        }
        return +r.toFixed(5)
    }

    static all(): Operations[] {
        return [
            Operations.equals, Operations.add, Operations.subtract,
            Operations.divide, Operations.multiply, Operations.clear
        ]
    }

    static parseNumber(value: number): string {
        switch (value) {
            case 0:
                return 'zero'
            case 1:
                return 'one'
            case 2:
                return 'two'
            case 3:
                return 'three'
            case 4:
                return 'four'
            case 5:
                return 'five'
            case 6:
                return 'six'
            case 7:
                return 'seven'
            case 8:
                return 'eight'
            case 9:
                return 'nine'
            default:
                return 'NaN'
        }
    }

    static parseOperation(operation: Operations): string {
        switch (operation) {
            case Operations.add:
                return 'add'
            case Operations.divide:
                return 'divide'
            case Operations.equals:
                return 'equals'
            case Operations.multiply:
                return 'multiply'
            case Operations.subtract:
                return 'subtract'
            case Operations.clear:
                return 'clear'
            default:
                return 'null'
        }
    }

    static isMath(payload: Operations) {
        return [Operations.multiply, Operations.add, Operations.subtract, Operations.divide].includes(payload)
    }
}
