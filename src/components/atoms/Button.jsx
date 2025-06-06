import { motion } from 'framer-motion'
import Icon from './Icon'

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  iconName, 
  iconSize = 20, 
  disabled = false,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors ${className}`}
      disabled={disabled}
      {...props}
    >
      {iconName && <Icon name={iconName} size={iconSize} />}
      <span>{children}</span>
    </motion.button>
  )
}

export default Button