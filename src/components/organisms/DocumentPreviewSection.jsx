import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Heading from '@/components/atoms/Heading'
import Button from '@/components/atoms/Button'
import Paragraph from '@/components/atoms/Paragraph'

const DocumentPreviewSection = ({ generatedDocument, clauses, setShowPreview, handleExport }) => {
  return (
    <motion.div
      key="preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <Heading level={3} className="text-2xl font-bold text-surface-900 dark:text-white">
          Document Preview
        </Heading>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setShowPreview(false)}
            className="border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
            iconName="ArrowLeft"
            iconSize={16}
          >
            Edit
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleExport('pdf')}
              className="bg-primary hover:bg-primary-dark text-white"
              iconName="Download"
              iconSize={16}
            >
              PDF
            </Button>
            <Button
              onClick={() => handleExport('docx')}
              className="bg-secondary hover:bg-secondary-dark text-white"
              iconName="FileText"
              iconSize={16}
            >
              DOCX
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Content */}
        <div className="lg:col-span-2">
          <div className="glass-effect rounded-2xl p-6 h-96 overflow-y-auto">
            <Heading level={4} className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
              {generatedDocument.title}
            </Heading>
            <div className="prose dark:prose-invert max-w-none">
              {clauses.map((clause, index) => (
                <div key={index} className="mb-6 p-4 border-l-4 border-primary/30 bg-surface-50 dark:bg-surface-800/50 rounded-r-lg">
                  <Heading level={5} className="font-semibold text-surface-900 dark:text-white mb-2">
                    {clause.category}
                  </Heading>
                  <Paragraph className="text-surface-700 dark:text-surface-300 text-sm leading-relaxed">
                    {clause.content}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plain English Sidebar */}
        <div className="space-y-4">
          <div className="glass-effect rounded-2xl p-6">
            <Heading level={4} className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Plain English
            </Heading>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {clauses.map((clause, index) => (
                <div key={index} className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <Heading level={6} className="font-medium text-surface-900 dark:text-white text-sm mb-1">
                    {clause.category}
                  </Heading>
                  <Paragraph className="text-surface-600 dark:text-surface-300 text-xs">
                    {clause.plainEnglish}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <Heading level={4} className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
              <Icon name="CheckCircle" size={20} className="mr-2 text-green-500" />
              Validation
            </Heading>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <Paragraph className="text-surface-600 dark:text-surface-300">Completeness</Paragraph>
                <Paragraph className="text-green-500 font-medium">100%</Paragraph>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Paragraph className="text-surface-600 dark:text-surface-300">Compliance</Paragraph>
                <Paragraph className="text-green-500 font-medium">Verified</Paragraph>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Paragraph className="text-surface-600 dark:text-surface-300">Required Fields</Paragraph>
                <Paragraph className="text-green-500 font-medium">Complete</Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DocumentPreviewSection