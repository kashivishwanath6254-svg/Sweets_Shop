import React from 'react';

const inputVariants = {
  default: "w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30",
  disabled: "w-full px-4 py-3 border border-amber-200 rounded-xl bg-amber-50/50 text-amber-500 cursor-not-allowed",
  form: "w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
};

const Input = ({ 
  variant = "default",
  className = "",
  label,
  error,
  disabled = false,
  ...props 
}) => {
  const baseClasses = "placeholder:text-amber-400/70";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-amber-700 font-medium">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${inputVariants[variant]} ${className}`}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export const Textarea = ({ 
  variant = "form",
  className = "",
  label,
  error,
  rows = 5,
  ...props 
}) => {
  const baseClasses = "placeholder:text-amber-400/70 resize-none";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-amber-700 font-medium">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`${baseClasses} ${inputVariants[variant]} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;
