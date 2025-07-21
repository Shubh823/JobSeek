import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { LoaderCircle } from "lucide-react";
import JobCardShimmer from './JobCardShimmer';



const Browse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false);
    useGetAllJobs(); // Fetch all jobs initially (custom hook)
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${JOB_API_END_POINT}/search`,
                    { query: searchQuery },
                    { withCredentials: true }
                );
                    setFilterJobs(res.data.jobs);
                    
            } catch (error) {
                console.error('Error fetching search results:', error);
                setFilterJobs(allJobs);
            }finally{
                setLoading(false);
            }
        }

        if (searchQuery.trim() !== '') {
            fetchJobs();
        } else {
            setFilterJobs(allJobs);
        }
    }, [searchQuery]);

    const handleBackClick = () => {
        dispatch(setSearchQuery("")); // clear query
        setFilterJobs(allJobs); // show all jobs again
        navigate('/');
    };



    return (
        <div>
            <Navbar />
            <div
                onClick={handleBackClick}
                className="inline-block px-5 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer mt-5 ml-5"
            >
                ← Back
            </div>

            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl mb-6">
                    Search Results ({filterJobs.length})
                </h1>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                >
                
                {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <JobCardShimmer key={idx} />
            )): filterJobs.map((job) => (
                <motion.div
                    key={job._id}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <Job job={job} />
                </motion.div>
            ))}

                    
                </motion.div>
            </div>
        </div>
    );
};

export default Browse;
