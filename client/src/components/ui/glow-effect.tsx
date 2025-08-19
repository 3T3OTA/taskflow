import React from "react";

interface GlowEffectProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "blue";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  variant = "primary",
  intensity = "medium",
  className = "",
}) => {
  const intensityMap = {
    low: {
      blur: "blur-[80px]",
      opacity: {
        primary: "from-primary-500/20 to-primary-400/10",
        secondary: "from-secondary-500/20 to-secondary-400/10",
        purple: "from-purple-500/20 to-purple-400/10",
        blue: "from-blue-500/20 to-blue-400/10",
      },
      size: "w-64 h-64",
    },
    medium: {
      blur: "blur-[100px]",
      opacity: {
        primary: "from-primary-500/30 to-primary-400/20",
        secondary: "from-secondary-500/30 to-secondary-400/20",
        purple: "from-purple-500/30 to-purple-400/20",
        blue: "from-blue-500/30 to-blue-400/20",
      },
      size: "w-80 h-80",
    },
    high: {
      blur: "blur-[120px]",
      opacity: {
        primary: "from-primary-500/40 to-primary-400/30",
        secondary: "from-secondary-500/40 to-secondary-400/30",
        purple: "from-purple-500/40 to-purple-400/30",
        blue: "from-blue-500/40 to-blue-400/30",
      },
      size: "w-96 h-96",
    },
  };

  const { blur, opacity, size } = intensityMap[intensity];
  const gradientColors = opacity[variant];

  return (
    <div className={`relative overflow-hidden ${className}`}>

      <div className={`absolute -top-40 -left-40 ${size} bg-gradient-to-r ${gradientColors} ${blur} animate-pulse-slow`}></div>

      <div className={`absolute bottom-120 -left-40 ${size} bg-gradient-to-r ${gradientColors} ${blur} animate-pulse-slow`}></div>

      <div className={`absolute bottom-300 -right-40 ${size} bg-gradient-to-r ${gradientColors} ${blur} animate-pulse-slow`}></div>

      <div className={`absolute bottom-500 -right-40 ${size} bg-gradient-to-r ${gradientColors} ${blur} animate-pulse-slow`}></div>

      <div className={`absolute -bottom-40 -right-40 ${size} bg-gradient-to-l ${gradientColors} ${blur} animate-pulse-slow`}></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowEffect;
