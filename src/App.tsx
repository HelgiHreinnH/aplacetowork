
import React from 'react'
import './App.css'
import { Toaster } from '@/components/ui/toaster'
import { FontDemo } from '@/components/design/FontDemo'
import WorkplaceSettings from '@/components/workplace/WorkplaceSettings'

function App() {
  return (
    <>
      <FontDemo />
      <WorkplaceSettings />
      <Toaster />
    </>
  )
}

export default App
