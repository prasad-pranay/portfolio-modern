import React, { useEffect, useState } from 'react'
import LoadingPage from './pages/LoadingPage'
import CallerPage from './Caller'
import { AnimatePresence } from 'framer-motion'
import Noise from './component/NoiseBg'
import Cursor from './component/Cursor'

const App = () => {

    const [loading,setshowLoading] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        setshowLoading(false)
      // }, 3800);
      }, 0);
    }, [])
    
  return (
    <>
    <AnimatePresence>
      {loading && <LoadingPage/>}
    </AnimatePresence>
    {!loading && <CallerPage/>}

    {/* background blur */}
      <Noise
        patternSize={250}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={20}
      />

      {/* animated cursor */}
      <Cursor />
    </>
  )
}

export default App



























