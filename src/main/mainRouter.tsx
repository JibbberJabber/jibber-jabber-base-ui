import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Home } from '../pages/home/home'
import { PostPage } from '../pages/postPage/postPage'
import { UserProfile } from '../pages/userProfile/userProfile'


export const MainRouter = () => {

  return (
    <Routes>
        <Route path={'/home'} element={<Home/>}/>
        <Route path="/user/:userId" element={ <UserProfile/> }/>
        <Route path="/post/:postId" element={ <PostPage/> }/>
        <Route path={'/*'} element={<Home/>}/>
    </Routes>
  )
}