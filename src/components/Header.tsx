import React from 'react'
import Logo from './Logo'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <header className="bg-[#1A1A1A] z-10 h-[60px] mb-4 fixed top-0 right-0 left-0">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Logo />

        <UserButton />
      </div>
    </header>
  )
}

export default Header