const Loader = ({
  size = "medium",
  color = "primary",
  text = "Loading...",
}) => {
  const sizeClasses: any = {
    small: {
      container: "h-4 w-4",
      text: "text-xs",
    },
    medium: {
      container: "h-8 w-8",
      text: "text-sm",
    },
    large: {
      container: "h-12 w-12",
      text: "text-base",
    },
  };

  const colorClasses: any = {
    primary: "border-pink-500 border-t-transparent",
    secondary: "border-blue-500 border-t-transparent",
    success: "border-green-500 border-t-transparent",
    warning: "border-yellow-500 border-t-transparent",
    danger: "border-red-500 border-t-transparent",
    gray: "border-gray-500 border-t-transparent",
  };

  const textColorClasses: any = {
    primary: "text-pink-500",
    secondary: "text-blue-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500",
    gray: "text-gray-500",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`
          rounded-full border-4 animate-spin 
          ${sizeClasses[size].container} 
          ${colorClasses[color]}
        `}
      />
      {text && (
        <p
          className={`mt-2 ${sizeClasses[size].text} ${textColorClasses[color]}`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
