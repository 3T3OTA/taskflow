import React from "react";

interface GlowEffectProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "blue";
  className?: string;
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  // ألوان بسيطة وخفيفة
  const colorMap = {
    primary: "from-primary-400/10 to-primary-200/10",
    secondary: "from-secondary-400/10 to-secondary-200/10",
    purple: "from-purple-400/10 to-purple-200/10",
    blue: "from-blue-400/10 to-blue-200/10",
  };
  const gradientColors = colorMap[variant];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Glow خفيف جدًا */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-gradient-to-br ${gradientColors} blur-lg opacity-60 -z-10`}></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowEffect;
