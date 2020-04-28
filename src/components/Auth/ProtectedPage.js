import React, { useContext } from 'react'
import { AppContext } from '../../reducer'
import HeaderAuth from './HeaderAuth'

function ProtectedPage() {
    const [state, dispatch] = useContext(AppContext)

    return state.isAuthenticated ? (
        <>
            <HeaderAuth />
            <h3>ProtectedPage</h3>
        </>
    ) : (
        <>
            <h3>ProtectedPage</h3>
        </>
    )
}

export default ProtectedPage
