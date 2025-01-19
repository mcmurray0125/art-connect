import React from 'react'
import{ Navigate, Outlet } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import GeneralLayout from '../layouts/GeneralLayout'
import GuestLayout from '../layouts/GuestLayout'

export default function AuthWrapper() {
    const { currentUser } = useAuth();
  
    return currentUser ? <GeneralLayout> <Outlet /> </GeneralLayout> : <GuestLayout> <Outlet /> </GuestLayout>;
  }