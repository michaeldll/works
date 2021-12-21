import React, { useEffect, lazy, Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { AppProvider } from './reducer'

import Home from './components/Home'
import HorsLesMurs from './components/HorsLesMurs'
import Classic from './components/Classic'
import IG from './components/IG'

import config from './components/Folio/utils/config'


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

const FolioComponent = lazy(() => import('./components/Folio/index'))

export default function App() {
    // get state and dispatch logic from reducer

    return (
        <AppProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/horslesmurs">
                        <HorsLesMurs />
                    </Route>
                    <Route path="/mathijs">
                        <IG />
                    </Route>
                    <Suspense fallback="loading">
                        <RefreshRoute component={FolioComponent} path="/folio" />
                    </Suspense>
                    {/* <Route path="/classic">
                        <Classic />
                    </Route> */}
                </Switch>
            </Router>
        </AppProvider>
    )
}
