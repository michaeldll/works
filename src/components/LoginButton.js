import React, { useContext } from 'react'
import { AppContext } from '../reducer'
import { useHistory } from 'react-router-dom'

const LoginButton = () => {
    const [state, dispatch] = useContext(AppContext)
    let history = useHistory()
    let { from } = { from: { pathname: '/protected' } }

    let login = () => {
        state.authenticate(() => {
            history.replace(from)
        })
    }

    return <button onClick={login}>Log in</button>
}

export default LoginButton
