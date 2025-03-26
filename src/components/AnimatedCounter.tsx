
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  formatter = (value) => value.toString()
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * (to - from) + from);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };
      
      animationFrame = requestAnimationFrame(step);
      controls.start("visible");
      
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={className}
    >
      {prefix}
      {formatter(count)}
      {suffix}
    </motion.div>
  );
}
