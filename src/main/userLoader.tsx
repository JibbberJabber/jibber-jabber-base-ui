import React, { ReactNode, useEffect, useState } from 'react'
import { User } from '../data/users'
import { Loading } from '../components/loading'
import { useUserData } from '../data/dataContext'
import { Unauthenticated } from '../components/unauthenticated'
import { isNotUndefined } from '../utils/undefined'
import { UserContext } from '../components/contexts/userContext'
import _kc from "./Keycloak";

export type UserLoaderProps = {
  children: ReactNode,
}

type UserLoaderState =
  | {
  status: 'loading'
}
  | {
  status: 'unauthenticated'
}
  | {
  status: 'loaded'
  user: User
}

export const UserLoader = ({children}: UserLoaderProps) => {
  const userData = useUserData()

  const [state, setState] = useState<UserLoaderState>({status: 'loading'})


  useEffect(() => {
    userData.getCurrentUser().then((user) => {
      console.log("user: " + user)
      if (isNotUndefined(user)){
        console.log("loaded")
        setState({status: 'loaded', user})
      }
      else
        setState({status: 'unauthenticated'})
    })
  }, [])


  switch (state.status) {
    case 'loading':
      return <Loading/>
    case 'unauthenticated':
      _kc.login()
      return<Unauthenticated/>
    case 'loaded':
      return (
          <UserContext.Provider value={state.user}>
            {children}
          </UserContext.Provider>
      )
  }
}