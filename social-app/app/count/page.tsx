'use client'

import { useState } from "react"

export default function Count() {
    const [count, setCount] = useState(0)

    console.log('Rendered')

    return (
        <>
            <div onPointerDown={ () => setCount(count - 1)}>-</div>
            <div>{count}</div>
            <div onPointerDown={ () => setCount(count + 1)}>+</div>
        </>
    )
}