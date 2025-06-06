const Spinner = ({ size = 12, className = '' }) => {
  return (
    <div 
      className={`animate-spin rounded-full border-b-2 border-primary ${className}`}
      style={{ height: `${size}px`, width: `${size}px` }}
    ></div>
  )
}

export default Spinner