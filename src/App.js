import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { AppProvider } from './reducer'

import Home from './components/Home'
import Folio from './components/Folio'
import HorsLesMurs from './components/HorsLesMurs'
import Classic from './components/Classic'

import config from './components/Folio/utils/config'
import '98.css'

// Redirects when refreshed
// https://stackoverflow.com/questions/51054653/react-router-v4-redirect-to-home-on-page-reload-inside-application
const RefreshRoute = ({ component: Component, ...rest }) => {
    useEffect(() => {
        if (!config.debug) localStorage.setItem('shouldRefresh', '1')
    }, [])

    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('shouldRefresh') === null ||
                localStorage.getItem('shouldRefresh') === '0' ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                        }}
                    />
                )
            }
        />
    )
}

export default function App() {
    // get state and dispatch logic from reducer

    return (
        <AppProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <RefreshRoute component={Folio} path="/folio" />
                    <Route path="/horslesmurs">
                        <HorsLesMurs />
                    </Route>
                    <Route path="/classic">
                        <Classic />
                    </Route>
                </Switch>
            </Router>
        </AppProvider>
    )
}
