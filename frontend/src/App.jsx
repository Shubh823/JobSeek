import { useState } from 'react'
import Navbar from './components/shared/Navbar'
import './App.css'
import {createBrowserRouter} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'

const appRouter=createBrowserRouter([
   {
    path:'/',
    element:<Home/>
   },
   {
    path:'/login',
    element:<Login/>
   },
   {
    path:'/signup',
    element:<Signup/>
   },
])
function App() {
  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
