import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginButton from './LoginButton'

function LoginPage() {
    let location = useLocation()
    let { from } = { from: { pathname: '/protected' } }

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <LoginButton />
        </div>
    )
}

export default LoginPage
