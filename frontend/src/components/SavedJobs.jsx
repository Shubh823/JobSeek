import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useSavedJobs from '../hooks/useSavedJobs';
import { Loader2, Bookmark, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const SavedJobs = () => {
    const { savedJobs, loading, fetchSavedJobs } = useSavedJobs();
    const { user } = useSelector(store => store.auth);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (user && !hasFetched) {
            fetchSavedJobs();
            setHasFetched(true);
        }
    }, [user, fetchSavedJobs, hasFetched]);

    const handleRefresh = () => {
        setHasFetched(false);
        fetchSavedJobs();
    };

    if (loading && !hasFetched) {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto mt-10 flex items-center justify-center'>
                    <div className='flex items-center gap-2'>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Loading your saved jobs...</span>
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
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-3'>
                            <div className='p-3 bg-purple-100 rounded-full'>
                                <Bookmark className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold text-gray-900'>Saved Jobs</h1>
                                <p className='text-gray-600 mt-1'>Your bookmarked job opportunities</p>
                            </div>
                        </div>
                        <Button onClick={handleRefresh} variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                    
                    {/* Stats */}
                    <div className='bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Total saved jobs</p>
                                <p className='text-2xl font-bold text-purple-600'>{savedJobs.length}</p>
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
                    {savedJobs.length <= 0 ? (
                        <div className='text-center py-12'>
                            <div className='p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                                <Bookmark className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className='text-lg font-medium text-gray-900 mb-2'>No saved jobs yet</h3>
                            <p className='text-gray-600'>Start saving jobs you're interested in by clicking the bookmark icon</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {savedJobs.map((job, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    key={job?._id}
                                    className='relative'
                                >
                                    {/* Saved Badge */}
                                    <div className='absolute -top-2 -right-2 z-10'>
                                        <div className='bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
                                            Saved
                                        </div>
                                    </div>
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                
            </div>
        </div>
    )
}

export default SavedJobs 