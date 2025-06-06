const Label = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-surface-700 dark:text-surface-200 font-medium mb-2 ${className}`}>
      {children}
    </label>
  )
}

export default Label