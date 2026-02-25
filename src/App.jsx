import React, { useEffect, useState } from 'react'
import LoadingPage from './pages/LoadingPage'
import CallerPage from './Caller'
import { AnimatePresence } from 'framer-motion'
import Noise from './component/NoiseBg'
import Cursor from './component/Cursor'
import { NotificationProvider } from './tool/Notification'

const App = () => {

  const [isFocused, setIsFocused] = useState(true);

 useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);


  const [loading, setshowLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setshowLoading(false)
    // }, 3800);
    }, 0);
  }, [])

  return (
    <NotificationProvider>
      <AnimatePresence>
        {loading && <LoadingPage />}
      </AnimatePresence>
      {!loading &&
        <CallerPage />
      }

      {/* background blur */}
      <Noise
        patternSize={250}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={20}
      />

      {/* animated cursor */}
      <Cursor isFocused={isFocused} />
    </NotificationProvider>
  )
}

export default App



























