import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { documentService } from '../services'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true)
      try {
        const result = await documentService.getAll()
        setDocuments(result || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load documents')
      } finally {
        setLoading(false)
      }
    }
    loadDocuments()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 bg-primary text-white rounded-xl">
              <ApperIcon name="Scale" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              LegalForge AI
            </h1>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-3 rounded-xl glass-effect hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          >
            <ApperIcon 
              name={darkMode ? "Sun" : "Moon"} 
              size={20} 
              className="text-surface-700 dark:text-surface-300"
            />
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-surface-900 dark:text-white mb-6">
              Smart Legal Documents
              <span className="text-primary block">Made Simple</span>
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto">
              Transform guided questionnaires into fully compliant legal documents with AI-powered clause generation.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">5 mins</div>
              <div className="text-surface-600 dark:text-surface-300">Average completion time</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">{documents.length || 0}</div>
              <div className="text-surface-600 dark:text-surface-300">Document templates</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-surface-600 dark:text-surface-300">Jurisdictions supported</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Feature */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <MainFeature documents={documents} loading={loading} error={error} />
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center text-surface-900 dark:text-white mb-12"
          >
            Why Choose LegalForge AI?
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Brain",
                title: "AI-Powered Generation",
                description: "Smart clause generation based on your jurisdiction and risk level"
              },
              {
                icon: "Shield",
                title: "Legally Compliant",
                description: "Documents that meet legal standards across 50+ jurisdictions"
              },
              {
                icon: "Clock",
                title: "Save Time & Money",
                description: "Generate professional documents in minutes, not hours"
              },
              {
                icon: "FileText",
                title: "Plain English Explanations",
                description: "Understand every clause with side-by-side explanations"
              },
              {
                icon: "CheckCircle",
                title: "Real-time Validation",
                description: "Instant feedback on document completeness and accuracy"
              },
              {
                icon: "Download",
                title: "Multiple Export Formats",
                description: "Download as PDF, DOCX, or share digitally"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <ApperIcon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home