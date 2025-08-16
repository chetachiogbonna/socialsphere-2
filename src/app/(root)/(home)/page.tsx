"use client";

import { SignInButton, UserButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import React from 'react'

export default function Home() {
  return (
    <div className='ml-[400px]'>
      <Authenticated>
        <UserButton />
        <div>Home page</div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </div>
  );
}
