import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs,searchedQuery} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    // Only clear searchedQuery on unmount
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    useEffect(() => {
        if (searchedQuery) {
            const search = searchedQuery.toLowerCase().trim();
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
    }, [allJobs, searchedQuery]);
    
    return (
        <div>
            <Navbar />
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
                                <Job job={job}/>
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default Browse