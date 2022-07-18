import React, {useEffect} from 'react'
import keycloak from "../Keycloak";

export const Unauthenticated = () => {


    useEffect(() => {
            keycloak.login({
                // redirectUri:  'https://jbbrjbbr2202.store/',
            })
        }, [])

  return (
    <div>
      Unauthenticated...
    </div>
  )
}