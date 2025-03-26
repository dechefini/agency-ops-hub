
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export default function StatCard({
  icon: Icon,
  title,
  value,
  prefix = "",
  suffix = "",
  formatter = (value) => value.toString(),
  description,
  trend,
  trendValue,
  className = "",
}: StatCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-xl p-6 ${className}`}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="mt-1 flex items-baseline">
            <h3 className="text-2xl font-semibold">
              <AnimatedCounter
                from={0}
                to={value}
                prefix={prefix}
                suffix={suffix}
                formatter={formatter}
              />
            </h3>
            {trend && (
              <span
                className={`ml-2 text-xs font-medium flex items-center ${
                  trend === "up"
                    ? "text-green-600"
                    : trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </motion.div>
  );
}
