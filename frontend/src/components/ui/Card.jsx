import React from 'react';

const cardVariants = {
  product: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200 flex flex-col h-full",
  section: "bg-white rounded-2xl shadow-xl p-8 border border-amber-200",
  simple: "bg-white rounded-xl shadow-md border border-amber-100"
};

const Card = ({ 
  children, 
  variant = "simple",
  className = "",
  onClick,
  ...props 
}) => {
  const baseClasses = "";
  
  return (
    <div
      className={`${baseClasses} ${cardVariants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`pb-4 mb-4 border-b border-amber-100 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`mt-4 pt-4 border-t border-amber-100 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
