import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import DropZone from './components/DropZone'

function App() {
  
     const handleFiles = (files: File[]) => {
    console.log(files);
  };
  

  return (
    <div>
     <h1 className='bg-blue-400'>This is shubham</h1>
      <DropZone onFilesSelected={handleFiles} />
    </div>
  )
}

export default App
