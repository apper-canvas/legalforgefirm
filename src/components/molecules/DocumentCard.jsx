import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Badge from '@/components/atoms/Badge'

const DocumentCard = ({ template, onClick, index }) => {
  const complexityClasses = {
    Simple: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Complex: 'bg-red-100 text-red-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(template)}
      className="glass-effect rounded-2xl p-6 cursor-pointer hover:shadow-card transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon name={template.icon} size={24} className="text-primary" />
        </div>
        <div className="text-right text-sm">
          <Paragraph className="text-surface-500 dark:text-surface-400">{template.estimatedTime}</Paragraph>
          <Badge className={`mt-1 ${complexityClasses[template.complexity]}`}>
            {template.complexity}
          </Badge>
        </div>
      </div>
      <Heading level={4} className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
        {template.title}
      </Heading>
      <Paragraph className="text-surface-600 dark:text-surface-300 text-sm">
        {template.description}
      </Paragraph>
    </motion.div>
  )
}

export default DocumentCard