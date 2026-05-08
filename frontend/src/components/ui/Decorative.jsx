import React from 'react';

export const AccentLine = ({ 
  variant = "horizontal", 
  className = "", 
  ...props 
}) => {
  const variants = {
    horizontal: "w-20 h-1 bg-amber-400 rounded-full",
    vertical: "w-2 h-8 bg-amber-500 rounded-full",
    small: "w-3 h-8 bg-amber-500 rounded-full"
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props} />
  );
};

export const LoadingSpinner = ({ 
  size = "md",
  className = "",
  ...props 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div 
      className={`${sizes[size]} border-2 border-white border-t-transparent rounded-full animate-spin ${className}`}
      {...props}
    />
  );
};

export const ErrorMessage = ({ 
  error, 
  onRetry, 
  className = "",
  ...props 
}) => (
  <div className={`text-center ${className}`} {...props}>
    <p className="text-red-500 mb-4">{error}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Try Again
      </button>
    )}
  </div>
);

export const StatusBadge = ({ 
  status, 
  children, 
  className = "",
  ...props 
}) => {
  const statusStyles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-500 text-white",
    error: "bg-red-600 text-white",
    default: "bg-gray-100 text-gray-700"
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default AccentLine;
