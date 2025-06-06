import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Heading from '@/components/atoms/Heading'

const Logo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center space-x-3"
    >
      <div className="p-2 bg-primary text-white rounded-xl">
        <Icon name="Scale" size={24} />
      </div>
      <Heading level={1} className="text-2xl font-bold text-surface-900 dark:text-white">
        LegalForge AI
      </Heading>
    </motion.div>
  )
}

export default Logo