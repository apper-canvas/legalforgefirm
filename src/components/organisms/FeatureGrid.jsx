import { motion } from 'framer-motion'
import Heading from '@/components/atoms/Heading'
import FeatureCard from '@/components/molecules/FeatureCard'

const features = [
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
]

const FeatureGrid = () => {
  return (
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
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid