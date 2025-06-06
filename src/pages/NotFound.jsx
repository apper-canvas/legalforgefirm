import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="FileQuestion" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-2">
            Page Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
            The legal document you're looking for doesn't exist. Let's get you back to creating compliant documents.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            <span>Back to Document Generator</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound