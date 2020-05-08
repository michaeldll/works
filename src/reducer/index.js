import React, { createContext, useReducer } from 'react'

const initialState = {
    isAuthenticated: false,
    authenticate(cb) {
        initialState.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        initialState.isAuthenticated = false
        setTimeout(cb, 100)
    },
    redirectOnRefresh: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'clear':
            return { ...initialState }
        case 'set-logged-in':
            return { ...state, isLoggedIn: action.value }
        default:
            return { ...initialState }
    }
}

export const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Pass array to value, to be destructured when retrieved
    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}
