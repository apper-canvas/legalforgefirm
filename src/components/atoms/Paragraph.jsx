import { motion } from 'framer-motion'

const Paragraph = ({ children, className = '', animate = false, initial = {}, animateProps = {}, transition = {}, ...props }) => {
  if (animate) {
    return (
      <motion.p
        initial={initial}
        animate={animateProps}
        transition={transition}
        className={`${className}`}
        {...props}
      >
        {children}
      </motion.p>
    )
  }

  return (
    <p className={`${className}`} {...props}>
      {children}
    </p>
  )
}

export default Paragraph