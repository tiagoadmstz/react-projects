import './Calculator.css'
import Display from '../components/Display'
import Button from '../components/Button'
import { useState } from 'react'

interface CalculatorState {
    displayValue: string
    clearDisplay: boolean
    operation: string
    values: Array<number>
    current: number
}

const initialState: CalculatorState = {
    displayValue: '0',
    clearDisplay: false,
    operation: '',
    values: [0, 0],
    current: 0
}

export default function Calculator() {
    const [state, setState] = useState({ ... initialState })

    const clearMemory = () => setState({... initialState})

    const setOperation = (operation: string) => {
        if (state.current === 0) {
            setState(prevState => ({... prevState, operation, current: 1, clearDisplay: true}))
        } else {
            const equals = operation === '='
            const currentOperation = state.operation
            const values = state.values
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = state.values[0]
            }
            values[1] = 0

            setState(prevState => ({
                ... prevState,
                displayValue: String(values[0]),
                operation: equals ? '' : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            }))
        }
    }

    const addDigit = (n: string) => {
        if (n === '.' && state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = state.displayValue === '0' || state.clearDisplay
        const currentValue = clearDisplay ? '' : state.displayValue
        const displayValue = currentValue + n
        setState(prevState => ({... prevState, displayValue, clearDisplay: false}))

        if (n !== '.') {
            const values = state.values
            values[state.current] = parseFloat(displayValue)
            setState(prevState => ({ ... prevState, values }))
        }
    }

    return (
        <div className='calculator'>
            <Display value={state.displayValue} />
            <Button label='AC' click={clearMemory} triple />
            <Button label='/' click={setOperation} operation />
            <Button label='7' click={addDigit} />
            <Button label='8' click={addDigit} />
            <Button label='9' click={addDigit} />
            <Button label='*' click={setOperation} operation />
            <Button label='4' click={addDigit} />
            <Button label='5' click={addDigit} />
            <Button label='6' click={addDigit} />
            <Button label='-' click={setOperation} operation />
            <Button label='1' click={addDigit} />
            <Button label='2' click={addDigit} />
            <Button label='3' click={addDigit} />
            <Button label='+' click={setOperation} operation />
            <Button label='0' click={addDigit}  double />
            <Button label='.' click={addDigit} />
            <Button label='=' click={setOperation} operation />
        </div>
    )
}
