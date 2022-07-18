import * as React from 'react'
import {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'

import {DataContainer, DataContext} from '../data/dataContext'
import {MainRouter} from './mainRouter'
import {createDataContainer} from './dataContainerInitializer'
import _kc from "./Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {UserLoader} from "./userLoader";


export const App = () => {
    const [dataContainer, setDataContainer] = useState<DataContainer>()

    useEffect(() => {

        createDataContainer()
            .then(container => setDataContainer(container))

    }, [])

    if (dataContainer === undefined)
        return (<div>Loading ...</div>)

    return (
        <ReactKeycloakProvider authClient={_kc} onTokens={tokens => {
            console.log("tokens:" + tokens.token)
            tokens.token? sessionStorage.setItem("token", tokens.token) : {} }}>
            <DataContext.Provider value={dataContainer}>
                <UserLoader>
                    <BrowserRouter>
                        <MainRouter/>
                    </BrowserRouter>
                </UserLoader>
            </DataContext.Provider>
        </ReactKeycloakProvider>
    )
}
