'use client'
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Highlight, HeroHighlight } from '@/components/ui/hero-highlight'
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import React, { useRef } from 'react'
import { FaCopy } from "react-icons/fa";
import { Select } from '@/components/ui/select';

const page = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand('copy');
        }
    };

    return (
        <div className='min-h-full '>
            <AuroraBackground>
                <HeroHighlight>
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: [20, -5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex items-center"
                    >
                        <div>
                            <Highlight className="text-white px-5">
                                V-uploader
                            </Highlight>
                            <form className="my-8" onSubmit={handleSubmit}>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="name">Video name</Label>
                                    <Input id="name" placeholder="Name" type="text" />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="password">video</Label>
                                    <Input id="password" placeholder="select the video" type="file" />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="position">Select position</Label>
                                    <Select id='position' />

                                </LabelInputContainer>
                                <button
                                    className="mt-5 bg-gradient-to-br relative group/btn from-black to-yellow-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    type="submit"
                                >
                                    Upload &uarr;
                                    <BottomGradient />
                                </button>

                                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                            </form>
                            <div className="mb-4 ">
                                <div className="flex justify-around">
                                    <Input id="link"
                                        ref={inputRef}
                                        placeholder="http://localhost:3000/"
                                        type="text"
                                        className='px-10' />
                                    <button
                                        onClick={copyToClipboard}
                                        className='text-2xl' >
                                        <FaCopy /></button>
                                </div>
                            </div>
                        </div>
                    </motion.h1>
                </HeroHighlight>
            </AuroraBackground>
        </div >
    )
}

export default page

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};