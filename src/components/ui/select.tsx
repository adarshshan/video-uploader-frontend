'use client';
import { cn } from '@/lib/utils';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import React from 'react'

export interface SelectProps
    extends React.InputHTMLAttributes<HTMLSelectElement> { }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, type, ...props }, ref) => {
        const radius = 100; // change this to increase the rdaius of the hover effect
        const [visible, setVisible] = React.useState(false);

        let mouseX = useMotionValue(0);
        let mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: any) {
            let { left, top } = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }
        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="p-[2px] rounded-lg transition duration-300 group/input"
            >
                <select id="position" className={cn(
                    `flex h-10 w-full border-none bg-zinc-800 text-white  rounded-md px-6 py-5 text-xl  file:border-0 file:bg-transparent 
          file:text-xl file:font-medium
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
                    className
                )}
                    ref={ref}
                    {...props}>
                    <option value="" disabled selected hidden>Choose a position</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                </select>
            </motion.div>
        )
    })
Select.displayName = "Select";
export { Select };
