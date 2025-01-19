import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "../components/Navigation"

export default function GeneralLayout() {
  return (
    <>
        <Navigation />
        <Outlet/>
    </>
  )
}
