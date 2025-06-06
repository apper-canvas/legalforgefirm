import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-effect rounded-2xl p-6 hover:shadow-card transition-shadow"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <Icon name={feature.icon} size={24} className="text-primary" />
      </div>
      <Heading level={4} className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
        {feature.title}
      </Heading>
      <Paragraph className="text-surface-600 dark:text-surface-300">
        {feature.description}
      </Paragraph>
    </motion.div>
  )
}

export default FeatureCard