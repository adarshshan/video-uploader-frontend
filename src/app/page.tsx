'use client'
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Highlight, HeroHighlight } from '@/components/ui/hero-highlight'
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import { FaCopy } from "react-icons/fa";
import { Select } from '@/components/ui/select';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from '../firebase'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
    let inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('bottom-right')
    const [video, setVideo] = useState<File | undefined>(undefined);
    const [videoperc, setVideoperc] = useState(0);
    const [videoLink, setVideoLink] = useState<null | string>(null);



    useEffect(() => {
        video && uploadFile(video);
    }, [video]);
    useEffect(() => {
        handleSetValue();
    }, [])
    const handleSetValue = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    const uploadFile = (file: any) => {
        try {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, 'videos/' + fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setVideoperc(Math.round(progress));
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setVideoLink(downloadURL);
                    });
                }
            );
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/v-uploader', { name, videoLink, position });
            console.log(data);
            if (data.success) {
                if (inputRef.current) {
                    inputRef.current.value = `http://localhost:8000?code=${data.newData.code}`;
                }
            } else console.log(data.message);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        setPosition(event.target.value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setVideo(e.target.files[0]);
        } else {
            setVideo(undefined);
        }
    };

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand('copy');
        }
    };

    return (
        <div className='min-h-full '>
            <ToastContainer position="top-right" autoClose={2000} />
            <AuroraBackground>
                <HeroHighlight>
                    <motion.h1
                        initial={{ opacity: 0, y: 20, }}
                        animate={{ opacity: 1, y: [20, -5, 0], }}
                        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], }}
                        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex items-center"
                    >
                        <div>
                            <Highlight className="text-white px-5">
                                V-uploader
                            </Highlight>
                            <form className="my-8" onSubmit={handleSubmit}>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="name">Video name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="video">video</Label>
                                    <Input
                                        id="video"
                                        placeholder="select the video"
                                        type="file"
                                        onChange={handleChange}
                                        accept='video/*' />
                                    {videoperc !== 0 && videoperc !== 100 && (< p className="text-xl text-yellow-700">
                                        {videoperc > 0 && videoperc < 100 ? "Uploading :" + videoperc + "%" : 'video uploaded'}
                                    </p>)}
                                    {videoperc === 100 && videoLink !== null && <p className="text-xl text-yellow-700">video uploaded</p>}


                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="position">Select position</Label>
                                    <Select id='position' value={position} onChange={handleSelectChange} />

                                </LabelInputContainer>
                                <button
                                    className={`mt-5 cursor-${(!videoLink || !name.length || !position.length) ? 'not-allowed' : 'default'} text-2xl bg-gradient-to-br relative group/btn from-black to-yellow-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
                                    type="submit"
                                >
                                    generate URL
                                    <BottomGradient />
                                </button>

                                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                            </form>
                            <div className="mb-4 ">
                                <div className="flex justify-around">
                                    <Input id="link"
                                        ref={inputRef}
                                        value={inputRef.current?.value}
                                        placeholder="http://localhost:3000/"
                                        type="text"
                                        className='px-10 cursor-not-allowed' />
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