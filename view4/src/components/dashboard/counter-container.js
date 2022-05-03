import React from 'react'
import { useSelector } from 'react-redux'


const CounterContainer = () => {
    const number = useSelector(state => state.counter.number);
    return <Counter number={number} />;
}

export default CounterContainer;