import React from "react";

export const PageHeader = ({ children, className = "", ...props }) => (
  <div className={`flex justify-center mb-6 ${className}`} {...props}>
    <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
  </div>
);

export const HeroSection = ({
  title,
  subtitle,
  children,
  className = "",
  backgroundImage = null,
  ...props
}) => {
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `url('${backgroundImage}')`,
      }
    : {};

  return (
    <section
      className={`relative h-screen bg-cover bg-center bg-fixed ${className}`}
      style={bgStyle}
      {...props}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-900/40 via-amber-800/30 to-amber-900/50"></div>

      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="max-w-3xl">
          <PageHeader />

          {title && (
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-linear-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                {title}
              </span>
            </h1>
          )}

          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 border-t-2 border-l-2 border-amber-400 transform rotate-45"></div>
          </div>

          {subtitle && (
            <p className="text-2xl md:text-3xl font-light text-amber-100 mb-10 leading-relaxed drop-shadow-lg">
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export const SectionHeader = ({
  title,
  subtitle,
  className = "",
  ...props
}) => (
  <div className={`text-center mb-16 ${className}`} {...props}>
    <PageHeader />
    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl text-amber-600/80 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export const GradientBackground = ({ children, className = "", ...props }) => (
  <div
    className={`bg-linear-to-br from-amber-50 to-amber-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default PageHeader;
