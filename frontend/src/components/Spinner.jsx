const Spinner = ({ size = 'medium', className = '' }) => {
  const spinnerSizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-4 ${spinnerSizes[size]} ${className} `}
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Spinner;
