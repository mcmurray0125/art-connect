import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "../components/Navigation"
import GuestNavigation from '../components/GuestNavigation'
import { useAuth } from '../contexts/AuthContext'

export default function General() {
  const { currentUser } = useAuth();
  return (
    <>
        {currentUser ? <Navigation /> : <GuestNavigation/> }
        <Outlet/>
    </>
  )
}
