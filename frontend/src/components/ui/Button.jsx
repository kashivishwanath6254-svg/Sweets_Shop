import React from "react";

const buttonVariants = {
  primary:
    "px-6 py-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-700 hover:via-amber-600 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md border border-amber-400/30",

  secondary:
    "px-6 py-2.5 bg-amber-100 text-amber-800 font-semibold rounded-xl hover:bg-amber-200 hover:shadow-md transition-all duration-300 border border-amber-300",

  outline:
    "px-6 py-2.5 border-2 border-amber-500 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 hover:border-amber-600 hover:text-amber-800 transition-all duration-300 bg-white",

  ghost:
    "px-6 py-2.5 text-amber-600 font-semibold rounded-xl hover:bg-amber-100 hover:text-amber-800 transition-all duration-300",

  success:
    "px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-600 hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md border border-green-400/30",

  danger:
    "px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md border border-red-400/30",

  warning:
    "px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md",

  fullWidth:
    "w-full py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-700 hover:via-amber-600 hover:to-amber-500 hover:shadow-xl transition-all duration-300 shadow-lg border border-amber-400/30",

  outlineFullWidth:
    "w-full py-3.5 border-2 border-amber-500 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 hover:border-amber-600 hover:text-amber-800 transition-all duration-300 bg-white",

  dangerOutline:
    "px-6 py-2.5 border-2 border-red-500 text-red-600 font-semibold rounded-xl hover:bg-red-50 hover:border-red-600 hover:text-red-700 transition-all duration-300 bg-white",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  // Override variant if fullWidth is true
  let finalVariant = variant;
  if (fullWidth) {
    if (variant === "outline") finalVariant = "outlineFullWidth";
    else if (variant === "danger") finalVariant = "dangerOutline";
    else finalVariant = "fullWidth";
  }

  const variantClass = buttonVariants[finalVariant] || buttonVariants.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
