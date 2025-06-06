import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

const StepProgressBar = ({ title, currentStep, totalSteps, onReset }) => {
  const progressWidth = `${(currentStep / totalSteps) * 100}%`

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <Heading level={3} className="text-2xl font-bold text-surface-900 dark:text-white">
          {title}
        </Heading>
        <button
          onClick={onReset}
          className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>
      <Paragraph className="text-sm text-surface-500 dark:text-surface-400 mt-1">
        Step {currentStep} of {totalSteps}
      </Paragraph>
    </div>
  )
}

export default StepProgressBar