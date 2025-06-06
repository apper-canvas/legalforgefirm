import { motion } from 'framer-motion'
import Paragraph from '@/components/atoms/Paragraph'

const StatCard = ({ value, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-effect rounded-2xl p-6"
    >
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <Paragraph className="text-surface-600 dark:text-surface-300">{label}</Paragraph>
    </motion.div>
  )
}

export default StatCard