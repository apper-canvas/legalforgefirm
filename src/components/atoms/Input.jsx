const Input = ({ type = 'text', value, onChange, className = '', placeholder = '', rows, ...props }) => {
  const baseClasses = "w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className={`${baseClasses} ${className}`}
        placeholder={placeholder}
        {...props}
      />
    )
  }

  if (type === 'select') {
    return (
      <select
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {props.children}
      </select>
    )
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Input