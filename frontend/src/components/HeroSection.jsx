import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    const goToRecommendedJobs = () => {
        navigate("/recommended");
    }

    return (
        <div className='text-center'>
            <motion.div
                className='flex flex-col gap-5 my-10'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                

                <p style={{
                    fontSize: '18px',
                    color: '#374151',
                    lineHeight: '1.6',
                    fontFamily: 'Segoe UI, sans-serif',
                }}>
                    Find your next opportunity, connect with top companies, and take the next step in your career journey. Discover jobs that match your skills and ambitions!
                </p>

                <motion.div
                    className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </motion.div>

                {/* Recommended Jobs CTA for logged-in students */}
                {user && user.role === 'student' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
                    >
                        <Button
                            onClick={goToRecommendedJobs}
                            variant="outline"
                            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Get Personalized Job Recommendations
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default HeroSection