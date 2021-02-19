import * as React from 'react'
export default function  ErrorFallback  ({error}) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{color: 'red'}}>{error.message}</pre>
        </div>
    )
}
