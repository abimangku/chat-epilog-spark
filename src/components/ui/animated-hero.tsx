import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  titles: string[];
  className?: string;
}

function AnimatedTitle({ titles, className = "" }: AnimatedTitleProps) {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <span className={`relative flex w-full justify-center overflow-hidden text-center ${className}`}>
      &nbsp;
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className="absolute font-normal"
          initial={{ opacity: 0, y: "-100" }}
          transition={{ type: "spring", stiffness: 50 }}
          animate={
            titleNumber === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: titleNumber > index ? -150 : 150,
                  opacity: 0,
                }
          }
        >
          {title}
        </motion.span>
      ))}
    </span>
  );
}

export { AnimatedTitle };
