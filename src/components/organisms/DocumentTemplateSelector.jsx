import { motion } from 'framer-motion'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import DocumentCard from '@/components/molecules/DocumentCard'

const DocumentTemplateSelector = ({ documentTypes, handleTemplateSelect }) => {
  return (
    <motion.div
      key="templates"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <Heading level={3} className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
          Choose Your Document Type
        </Heading>
        <Paragraph className="text-surface-600 dark:text-surface-300">
          Select a template to start generating your legal document
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((template, index) => (
          <DocumentCard
            key={template.id}
            template={template}
            onClick={handleTemplateSelect}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default DocumentTemplateSelector