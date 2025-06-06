import { motion } from 'framer-motion'

const Heading = ({ level, children, className = '', animate = false, initial = {}, whileInView = {}, transition = {}, ...props }) => {
  const Tag = `h${level}`

  if (animate) {
    return (
      <motion.div
        initial={initial}
        whileInView={whileInView}
        transition={transition}
      >
        <Tag className={`${className}`} {...props}>
          {children}
        </Tag>
      </motion.div>
    )
  }

  return (
    <Tag className={`${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Heading