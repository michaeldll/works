import React, { useContext } from 'react'
import { AppContext } from '../reducer'
import { useHistory, useLocation } from 'react-router-dom'
import LoginButton from './LoginButton'

const HeaderAuth = () => {
    // get state and dispatch logic from reducer
    const [state, dispatch] = useContext(AppContext)
    let history = useHistory()

    return state.isAuthenticated ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    state.signout(() => history.push('/'))
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <>
            <p>You are not logged in.</p>
            <LoginButton />
        </>
    )
}

export default HeaderAuth
