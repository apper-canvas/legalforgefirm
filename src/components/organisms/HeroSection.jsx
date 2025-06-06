import { motion } from 'framer-motion'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import StatCard from '@/components/molecules/StatCard'

const HeroSection = ({ documentCount }) => {
  const stats = [
    { value: "5 mins", label: "Average completion time" },
    { value: documentCount, label: "Document templates" },
    { value: "50+", label: "Jurisdictions supported" }
  ]

  return (
    <section className="px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading level={2} className="text-4xl md:text-6xl font-bold text-surface-900 dark:text-white mb-6">
            Smart Legal Documents
            <span className="text-primary block">Made Simple</span>
          </Heading>
          <Paragraph className="text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto" animate animateProps={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.3 }}>
            Transform guided questionnaires into fully compliant legal documents with AI-powered clause generation.
          </Paragraph>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection