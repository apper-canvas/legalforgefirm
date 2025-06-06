import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Icon from '@/components/atoms/Icon'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import StepProgressBar from '@/components/molecules/StepProgressBar'
import { questionService, clauseService } from '@/services'

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

const DocumentGeneratorForm = ({ selectedTemplate, setCurrentStep, handleNextStep, handlePrevStep, answers, handleAnswerChange, isGenerating, questions, setQuestions, setIsGenerating, setClauses, setGeneratedDocument, setShowPreview, resetGenerator }) => {

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

  const currentStepNum = questions.length > 0 ? Object.keys(answers).length + 1 : 1;
  const totalStepsNum = questions.length > 0 ? questions.length : 1;
  const currentQuestion = questions[currentStepNum - 1];

  const handleNext = () => {
    if (currentStepNum <= questions.length) {
      setCurrentStep(currentStepNum + 1)
    } else {
      generateDocument()
    }
  }

  const handleBack = () => {
    if (currentStepNum > 1) {
      setCurrentStep(currentStepNum - 1)
    } else {
      resetGenerator()
    }
  }

  return (
    <motion.div
      key="questionnaire"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-4xl mx-auto"
    >
      <StepProgressBar
        title={selectedTemplate.title}
        currentStep={currentStepNum}
        totalSteps={totalStepsNum}
        onReset={resetGenerator}
      />

      <div className="glass-effect rounded-2xl p-8">
        {isGenerating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Brain" size={32} className="text-primary animate-pulse" />
            </div>
            <Heading level={4} className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
              AI is generating your document...
            </Heading>
            <Paragraph className="text-surface-600 dark:text-surface-300 typewriter-cursor">
              Creating legally compliant clauses
            </Paragraph>
          </div>
        ) : questions.length > 0 && currentQuestion ? (
          <div className="space-y-6">
            <FormField
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
            />

            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                className="border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                iconName="ArrowLeft"
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
                iconName={currentStepNum === questions.length ? "Sparkles" : "ArrowRight"}
              >
                {currentStepNum === questions.length ? 'Generate Document' : 'Next'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="FileQuestion" size={48} className="text-surface-400 mx-auto mb-4" />
            <Paragraph className="text-surface-600 dark:text-surface-400">
              No questions available for this template
            </Paragraph>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default DocumentGeneratorForm