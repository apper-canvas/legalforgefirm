import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { documentService } from '@/services'
import Spinner from '@/components/atoms/Spinner'
import Icon from '@/components/atoms/Icon'
import Paragraph from '@/components/atoms/Paragraph'
import DocumentTemplateSelector from './DocumentTemplateSelector'
import DocumentGeneratorForm from './DocumentGeneratorForm'
import DocumentPreviewSection from './DocumentPreviewSection'

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

const MainContent = ({ documents, loading, error }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentStep, setCurrentStep] = useState(0) // 0: template select, 1+: questions
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [clauses, setClauses] = useState([])
  const [generatedDocument, setGeneratedDocument] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

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
        <Spinner size={48} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
        <Paragraph className="text-surface-600 dark:text-surface-400">Failed to load document generator</Paragraph>
      </div>
    )
  }

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedTemplate && (
            <DocumentTemplateSelector
              documentTypes={documentTypes}
              handleTemplateSelect={handleTemplateSelect}
            />
          )}

          {selectedTemplate && !showPreview && (
            <DocumentGeneratorForm
              selectedTemplate={selectedTemplate}
              setCurrentStep={setCurrentStep}
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              isGenerating={isGenerating}
              questions={questions}
              setQuestions={setQuestions}
              setIsGenerating={setIsGenerating}
              setClauses={setClauses}
              setGeneratedDocument={setGeneratedDocument}
              setShowPreview={setShowPreview}
              resetGenerator={resetGenerator}
            />
          )}

          {showPreview && generatedDocument && (
            <DocumentPreviewSection
              generatedDocument={generatedDocument}
              clauses={clauses}
              setShowPreview={setShowPreview}
              handleExport={handleExport}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MainContent