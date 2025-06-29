import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetRecommendedJobs from '../hooks/useGetRecommendedJobs';
import { Loader2, Lightbulb, AlertCircle } from 'lucide-react';

const RecommendedJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const { loading, error, message } = useGetRecommendedJobs();

    useEffect(() => {
        setFilterJobs(allJobs);
    }, [allJobs]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto mt-10 flex items-center justify-center'>
                    <div className='flex items-center gap-2'>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Finding jobs that match your skills...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto mt-10 flex items-center justify-center'>
                    <div className='flex items-center gap-2 text-red-600'>
                        <AlertCircle className="h-6 w-6" />
                        <span>{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                {/* Header Section */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-3 bg-purple-100 rounded-full'>
                            <Lightbulb className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>Recommended for You</h1>
                            <p className='text-gray-600 mt-1'>{message}</p>
                        </div>
                    </div>
                    
                    {/* Stats */}
                    <div className='bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Jobs found based on your skills</p>
                                <p className='text-2xl font-bold text-purple-600'>{filterJobs.length}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-sm text-gray-600'>Last updated</p>
                                <p className='text-sm font-medium text-gray-900'>Just now</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className='mb-8'>
                    {filterJobs.length <= 0 ? (
                        <div className='text-center py-12'>
                            <div className='p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                                <AlertCircle className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className='text-lg font-medium text-gray-900 mb-2'>No recommended jobs found</h3>
                            <p className='text-gray-600'>Try updating your skills in your profile to get better recommendations</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {filterJobs.map((job, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    key={job?._id}
                                    className='relative'
                                >
                                    {/* Recommendation Badge */}
                                    <div className='absolute -top-2 -right-2 z-10'>
                                        <div className='bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
                                            Recommended
                                        </div>
                                    </div>
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tips Section */}
                {filterJobs.length > 0 && (
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
                        <h3 className='text-lg font-semibold text-blue-900 mb-3'>💡 Tips for better recommendations</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800'>
                            <div>
                                <p className='font-medium mb-1'>• Update your skills regularly</p>
                                <p className='text-blue-700'>Keep your profile skills current with the latest technologies</p>
                            </div>
                            <div>
                                <p className='font-medium mb-1'>• Be specific with skills</p>
                                <p className='text-blue-700'>Add specific technologies like "React", "Node.js", "Python"</p>
                            </div>
                            <div>
                                <p className='font-medium mb-1'>• Include experience level</p>
                                <p className='text-blue-700'>Mention your experience with each skill</p>
                            </div>
                            <div>
                                <p className='font-medium mb-1'>• Upload your resume</p>
                                <p className='text-blue-700'>Resume helps us understand your background better</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecommendedJobs 