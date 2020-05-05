import React, { useContext, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { AppProvider } from './reducer'
import { AppContext } from './reducer/'

import Home from './components/Home'
import Folio from './components/Folio'
import HorsLesMurs from './components/HorsLesMurs'
import ProtectedPage from './components/Auth/ProtectedPage'
import LoginPage from './components/Auth/LoginPage'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    // get state and dispatch logic from reducer
    const [state, dispatch] = useContext(AppContext)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                state.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}

export default function App() {
    // get state and dispatch logic from reducer

    useEffect(() => {
        window.addEventListener(
            'touchend',
            function onFirstTouch() {
                window.USER_HAS_TOUCHED = true
                // detect iOS 13+ and add permissions

                if (
                    typeof DeviceOrientationEvent.requestPermission ===
                    'function'
                ) {
                    DeviceOrientationEvent.requestPermission()
                        .then((permissionState) => {
                            console.log('permission state: ', permissionState)
                        })
                        .catch(console.error)
                }

                window.removeEventListener('touchend', onFirstTouch, false)
            },
            false
        )
    }, [])

    return (
        <AppProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/folio">
                        <Folio />
                    </Route>
                    <Route path="/horslesmurs">
                        <HorsLesMurs />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <PrivateRoute path="/protected">
                        <ProtectedPage />
                    </PrivateRoute>
                </Switch>
            </Router>
        </AppProvider>
    )
}
