import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { questionService, clauseService } from '../services'

const MainFeature = ({ documents, loading, error }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [clauses, setClauses] = useState([])
  const [generatedDocument, setGeneratedDocument] = useState(null)
  const [validationStatus, setValidationStatus] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const documentTypes = [
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Protect confidential information in business relationships',
      icon: 'FileShield',
      estimatedTime: '5 mins',
      complexity: 'Simple'
    },
    {
      id: 'rental',
      title: 'Rental Agreement',
      description: 'Comprehensive lease agreement for residential properties',
      icon: 'Home',
      estimatedTime: '8 mins',
      complexity: 'Medium'
    },
    {
      id: 'partnership',
      title: 'Partnership Deed',
      description: 'Formal agreement between business partners',
      icon: 'Users',
      estimatedTime: '12 mins',
      complexity: 'Complex'
    },
    {
      id: 'employment',
      title: 'Employment Contract',
      description: 'Standard employment agreement with terms and conditions',
      icon: 'Briefcase',
      estimatedTime: '7 mins',
      complexity: 'Medium'
    },
    {
      id: 'service',
      title: 'Service Agreement',
      description: 'Contract for professional services and deliverables',
      icon: 'Handshake',
      estimatedTime: '6 mins',
      complexity: 'Simple'
    },
    {
      id: 'purchase',
      title: 'Purchase Agreement',
      description: 'Legal document for buying and selling goods or property',
      icon: 'ShoppingCart',
      estimatedTime: '10 mins',
      complexity: 'Medium'
    }
  ]

  useEffect(() => {
    if (selectedTemplate) {
      loadQuestions(selectedTemplate.id)
    }
  }, [selectedTemplate])

  const loadQuestions = async (templateId) => {
    try {
      const questionData = await questionService.getAll()
      const templateQuestions = questionData.filter(q => q.templateId === templateId) || []
      setQuestions(templateQuestions)
    } catch (err) {
      toast.error('Failed to load questions')
    }
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setCurrentStep(1)
    setAnswers({})
    setGeneratedDocument(null)
    setShowPreview(false)
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    
    // Update validation status
    setValidationStatus(prev => ({
      ...prev,
      [questionId]: value && value.trim() !== ''
    }))
  }

  const handleNextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    } else {
      generateDocument()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      setSelectedTemplate(null)
      setCurrentStep(0)
    }
  }

  const generateDocument = async () => {
    setIsGenerating(true)
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const clauseData = await clauseService.getAll()
      const relevantClauses = clauseData.filter(c => 
        c.templateId === selectedTemplate.id
      ) || []
      
      setClauses(relevantClauses)
      setGeneratedDocument({
        title: `${selectedTemplate.title} - ${new Date().toLocaleDateString()}`,
        content: relevantClauses.map(c => c.content).join('\n\n'),
        answers: answers
      })
      setShowPreview(true)
      toast.success('Document generated successfully!')
    } catch (err) {
      toast.error('Failed to generate document')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = (format) => {
    toast.success(`Document exported as ${format.toUpperCase()}`)
  }

  const resetGenerator = () => {
    setSelectedTemplate(null)
    setCurrentStep(0)
    setAnswers({})
    setGeneratedDocument(null)
    setShowPreview(false)
    setClauses([])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
        <p className="text-surface-600 dark:text-surface-400">Failed to load document generator</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* Template Selection */}
        {!selectedTemplate && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Choose Your Document Type
              </h3>
              <p className="text-surface-600 dark:text-surface-300">
                Select a template to start generating your legal document
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTemplateSelect(template)}
                  className="glass-effect rounded-2xl p-6 cursor-pointer hover:shadow-card transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <ApperIcon name={template.icon} size={24} className="text-primary" />
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-surface-500 dark:text-surface-400">{template.estimatedTime}</div>
                      <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                        template.complexity === 'Simple' ? 'bg-green-100 text-green-700' :
                        template.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {template.complexity}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                    {template.title}
                  </h4>
                  <p className="text-surface-600 dark:text-surface-300 text-sm">
                    {template.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Questionnaire */}
        {selectedTemplate && !showPreview && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                  {selectedTemplate.title}
                </h3>
                <button
                  onClick={resetGenerator}
                  className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
              <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / (questions.length + 1)) * 100}%` }}
                />
              </div>
              <div className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                Step {currentStep} of {questions.length || 1}
              </div>
            </div>

            {/* Question Form */}
            <div className="glass-effect rounded-2xl p-8">
              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Brain" size={32} className="text-primary animate-pulse" />
                  </div>
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                    AI is generating your document...
                  </h4>
                  <p className="text-surface-600 dark:text-surface-300 typewriter-cursor">
                    Creating legally compliant clauses
                  </p>
                </div>
              ) : questions.length > 0 && currentStep <= questions.length ? (
                <div className="space-y-6">
                  {questions[currentStep - 1] && (
                    <>
                      <div>
                        <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                          {questions[currentStep - 1].text}
                        </h4>
                        {questions[currentStep - 1].helpText && (
                          <p className="text-surface-600 dark:text-surface-300 text-sm">
                            {questions[currentStep - 1].helpText}
                          </p>
                        )}
                      </div>

                      {questions[currentStep - 1].type === 'text' && (
                        <input
                          type="text"
                          value={answers[questions[currentStep - 1].id] || ''}
                          onChange={(e) => handleAnswerChange(questions[currentStep - 1].id, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your answer..."
                        />
                      )}

                      {questions[currentStep - 1].type === 'select' && (
                        <select
                          value={answers[questions[currentStep - 1].id] || ''}
                          onChange={(e) => handleAnswerChange(questions[currentStep - 1].id, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select an option...</option>
                          {questions[currentStep - 1].options?.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {questions[currentStep - 1].type === 'textarea' && (
                        <textarea
                          value={answers[questions[currentStep - 1].id] || ''}
                          onChange={(e) => handleAnswerChange(questions[currentStep - 1].id, e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter detailed information..."
                        />
                      )}
                    </>
                  )}

                  <div className="flex justify-between pt-6">
                    <button
                      onClick={handlePrevStep}
                      className="flex items-center space-x-2 px-6 py-3 rounded-xl border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <ApperIcon name="ArrowLeft" size={20} />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={handleNextStep}
                      disabled={!answers[questions[currentStep - 1]?.id]}
                      className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>{currentStep === questions.length ? 'Generate Document' : 'Next'}</span>
                      <ApperIcon name={currentStep === questions.length ? "Sparkles" : "ArrowRight"} size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ApperIcon name="FileQuestion" size={48} className="text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-600 dark:text-surface-400">
                    No questions available for this template
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Document Preview */}
        {showPreview && generatedDocument && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                Document Preview
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="ArrowLeft" size={16} />
                  <span>Edit</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white transition-colors"
                  >
                    <ApperIcon name="Download" size={16} />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport('docx')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary-dark text-white transition-colors"
                  >
                    <ApperIcon name="FileText" size={16} />
                    <span>DOCX</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Document Content */}
              <div className="lg:col-span-2">
                <div className="glass-effect rounded-2xl p-6 h-96 overflow-y-auto">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
                    {generatedDocument.title}
                  </h4>
                  <div className="prose dark:prose-invert max-w-none">
                    {clauses.map((clause, index) => (
                      <div key={index} className="mb-6 p-4 border-l-4 border-primary/30 bg-surface-50 dark:bg-surface-800/50 rounded-r-lg">
                        <h5 className="font-semibold text-surface-900 dark:text-white mb-2">
                          {clause.category}
                        </h5>
                        <p className="text-surface-700 dark:text-surface-300 text-sm leading-relaxed">
                          {clause.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Plain English Sidebar */}
              <div className="space-y-4">
                <div className="glass-effect rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                    <ApperIcon name="MessageCircle" size={20} className="mr-2" />
                    Plain English
                  </h4>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {clauses.map((clause, index) => (
                      <div key={index} className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                        <h6 className="font-medium text-surface-900 dark:text-white text-sm mb-1">
                          {clause.category}
                        </h6>
                        <p className="text-surface-600 dark:text-surface-300 text-xs">
                          {clause.plainEnglish}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                    <ApperIcon name="CheckCircle" size={20} className="mr-2 text-green-500" />
                    Validation
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-300">Completeness</span>
                      <span className="text-green-500 font-medium">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-300">Compliance</span>
                      <span className="text-green-500 font-medium">Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-300">Required Fields</span>
                      <span className="text-green-500 font-medium">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature