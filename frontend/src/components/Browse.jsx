import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Only clear searchedQuery on unmount
    useEffect(() => {
        if (searchQuery !== '') {
            const search = searchQuery.toLowerCase().trim();
            const searchWords = search.split(/\s+/).filter(Boolean);
            const filteredJobs = allJobs.filter((job) => {
                // Gather all searchable fields as an array of strings
                const fields = [
                    job?.title,
                    job?.description,
                    job?.location,
                    job?.jobType,
                    job?.experienceLevel,
                    job?.position,
                    job?.salary,
                    Array.isArray(job?.requirements) ? job.requirements.join(' ') : '',
                    job?.company?.name
                ].map(f => (typeof f === 'string' || typeof f === 'number') ? String(f).toLowerCase() : '');
                // Each search word must be present in at least one field
                return searchWords.every(word => fields.some(field => field.includes(word)));
            });
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs]);
    const handleClick = () => {
        dispatch(setSearchQuery(" "));
        navigate('/');
    }

    return (
        <div>
            <Navbar />
            <div
                onClick={handleClick}
                className="inline-block px-5 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
            >
                ← Back
            </div>

            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filterJobs.length})</h1>
                <motion.div
                    className='grid grid-cols-3 gap-4'
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.08
                            }
                        }
                    }}
                >
                    {
                        filterJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default Browse