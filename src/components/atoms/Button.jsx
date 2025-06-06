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
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors ${className}`}
      disabled={disabled}
      type="button"
      {...props}
    >
      {iconName && <Icon name={iconName} size={iconSize} />}
      <span>{children}</span>
    </motion.button>
  )
}

export default Button