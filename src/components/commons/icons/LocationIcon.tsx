import React from "react";

interface LocationIconProps {
  className?: string;
  color?: string;
  size?: number;
}

const LocationIcon: React.FC<LocationIconProps> = ({
  className = "",
  color = "currentColor",
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      className={`${className}`}
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.25c3.45 0 6.25 2.8 6.25 6.25 0 4.5-6.25 11.25-6.25 11.25S5.75 13 5.75 8.5c0-3.45 2.8-6.25 6.25-6.25z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
      />
    </svg>
  );
};

export default LocationIcon;
