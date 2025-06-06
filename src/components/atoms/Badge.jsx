const Badge = ({ children, className = '' }) => {
  return (
    <div className={`text-xs px-2 py-1 rounded-full ${className}`}>
      {children}
    </div>
  )
}

export default Badge