import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestNavigation from '../components/GuestNavigation'

export default function GuestLayout() {
  return (
    <>
        <GuestNavigation/>
        <Outlet/>
    </>
  )
}
