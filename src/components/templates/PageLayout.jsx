import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Icon from '@/components/atoms/Icon'
import Logo from '@/components/molecules/Logo'

const PageLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-3 rounded-xl glass-effect hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          >
            <Icon 
              name={darkMode ? "Sun" : "Moon"} 
              size={20} 
              className="text-surface-700 dark:text-surface-300"
            />
          </motion.button>
        </div>
      </header>
      {children}
    </div>
  )
}

export default PageLayout