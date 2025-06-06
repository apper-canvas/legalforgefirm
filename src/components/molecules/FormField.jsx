import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'

const FormField = ({ question, value, onChange, ...props }) => {
  if (!question) return null

  return (
    <div>
      <Label htmlFor={question.id} className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
        {question.text}
      </Label>
      {question.helpText && (
        <p className="text-surface-600 dark:text-surface-300 text-sm mb-4">
          {question.helpText}
        </p>
      )}

      {question.type === 'text' && (
        <Input
          type="text"
          id={question.id}
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder="Enter your answer..."
          {...props}
        />
      )}

      {question.type === 'select' && (
        <Input
          type="select"
          id={question.id}
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          {...props}
        >
          <option value="">Select an option...</option>
          {question.options?.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </Input>
      )}

      {question.type === 'textarea' && (
        <Input
          type="textarea"
          id={question.id}
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          rows={4}
          placeholder="Enter detailed information..."
          {...props}
        />
      )}
    </div>
  )
}

export default FormField